import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Comprehensive list of spam keywords commonly used by marketing & promotion bots
const SPAM_KEYWORDS = [
  "seo",
  "search engine optimization",
  "digital marketing",
  "website promotion",
  "google business profile",
  "ppc advertising",
  "performance marketing",
  "content marketing",
  "email marketing",
  "online reputation",
  "lead generation",
  "ranking on 1st page",
  "guaranteed keywords",
  "increase traffic",
  "backlinks",
  "outsource",
  "web development consultant",
  "casino",
  "crypto",
  "bitcoin",
  "viagra",
  "loan",
  "http://",
  "https://",
  "www.",
  ".com",
  ".net",
  ".org",
  "telegram",
  "whatsapp marketing",
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = (formData.get("name")?.toString() || "").trim();
    const mobile = (formData.get("mobile")?.toString() || "").trim();
    const email = (formData.get("email")?.toString() || "").trim();
    const service = (formData.get("service")?.toString() || "Direct Contact").trim();
    const message = (formData.get("message")?.toString() || "").trim();

    // Honeypot fields (hidden from real users, auto-filled by bots)
    const website = formData.get("website")?.toString() || "";
    const confirmEmail = formData.get("confirm_email")?.toString() || "";
    const hpAddress = formData.get("hp_address")?.toString() || "";

    // 1. HONEYPOT CHECK: If any hidden honeypot field is filled, silently trap the bot with a fake success
    if (website || confirmEmail || hpAddress) {
      console.warn("🤖 Bot trap triggered via honeypot field!");
      return NextResponse.redirect(new URL("/get-quote?submitted=true", req.url));
    }

    // 2. MOBILE NUMBER VALIDATION: Must be a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9
    const cleanMobile = mobile.replace(/\D/g, "");
    const indianMobileRegex = /^[6-9]\d{9}$/;
    if (!indianMobileRegex.test(cleanMobile)) {
      console.warn(`🤖 Bot trap triggered: Invalid mobile number format (${mobile})`);
      // Return 400 error for real users, but silently block bots trying random numbers like 2102102101
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian mobile number (e.g. 9885034309)." },
        { status: 400 }
      );
    }

    // 3. SPAM KEYWORD CHECK in Message, Name, and Email
    const combinedContent = `${name} ${email} ${message}`.toLowerCase();
    const hasSpamKeyword = SPAM_KEYWORDS.some((kw) => combinedContent.includes(kw));

    if (hasSpamKeyword) {
      console.warn(`🤖 Bot trap triggered: Spam keywords detected in submission by ${name}`);
      // Fake redirect to success page so the bot thinks it succeeded, but DO NOT save to database!
      return NextResponse.redirect(new URL("/get-quote?submitted=true", req.url));
    }

    // 4. NAME VALIDATION: Reject names that look like URLs, domains, or marketing titles
    if (name.length > 50 || name.toLowerCase().includes("consultant") || name.toLowerCase().includes("agency")) {
      console.warn(`🤖 Bot trap triggered: Suspicious name (${name})`);
      return NextResponse.redirect(new URL("/get-quote?submitted=true", req.url));
    }

    if (!name || !cleanMobile) {
      return NextResponse.json({ error: "Name and valid mobile number are required." }, { status: 400 });
    }

    // Insert legitimate lead into Supabase
    const { error } = await supabase.from("leads").insert({
      name,
      mobile: cleanMobile,
      email,
      service,
      message,
      verified: false,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.redirect(new URL("/get-quote?submitted=true", req.url));
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}