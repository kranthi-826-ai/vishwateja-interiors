import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Comprehensive list of spam keywords commonly used by marketing & promotion bots
const TEXT_SPAM_KEYWORDS = [
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

// Specific spam terms for email addresses (excluding TLDs like .com, .net, .org)
const EMAIL_SPAM_KEYWORDS = [
  "marketing",
  "seo",
  "casino",
  "crypto",
  "viagra",
  "promotion",
  "agency",
  "consultant",
];

export async function POST(req: NextRequest) {
  try {
    let name = "";
    let mobile = "";
    let email = "";
    let pincode = "";
    let service = "Direct Contact";
    let message = "";
    let home_type: string | undefined;
    let requirement_type: string | undefined;
    let material_quality: string | undefined;
    let budget_range: string | undefined;
    let rooms_selected: string[] | undefined;
    let verified = false;

    // Honeypot fields
    let website = "";
    let confirmEmail = "";
    let hpAddress = "";

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      name = (body.name || "").trim();
      mobile = (body.mobile || "").trim();
      email = (body.email || "").trim();
      pincode = (body.pincode || "").trim();
      service = (body.service || "Direct Contact").trim();
      message = (body.message || "").trim();
      home_type = body.home_type;
      requirement_type = body.requirement_type;
      material_quality = body.material_quality;
      budget_range = body.budget_range;
      rooms_selected = body.rooms_selected;
      verified = Boolean(body.verified);

      website = body.website || "";
      confirmEmail = body.confirm_email || "";
      hpAddress = body.hp_address || "";
    } else {
      const formData = await req.formData();
      name = (formData.get("name")?.toString() || "").trim();
      mobile = (formData.get("mobile")?.toString() || "").trim();
      email = (formData.get("email")?.toString() || "").trim();
      pincode = (formData.get("pincode")?.toString() || "").trim();
      service = (formData.get("service")?.toString() || "Direct Contact").trim();
      message = (formData.get("message")?.toString() || "").trim();

      website = formData.get("website")?.toString() || "";
      confirmEmail = formData.get("confirm_email")?.toString() || "";
      hpAddress = formData.get("hp_address")?.toString() || "";
    }

    // 1. HONEYPOT CHECK
    if (website || confirmEmail || hpAddress) {
      console.warn("🤖 Bot trap triggered via honeypot field");
      if (contentType.includes("application/json")) {
        return NextResponse.json({ success: true, message: "Request received" });
      }
      return NextResponse.redirect(new URL("/get-quote?submitted=true", req.url));
    }

    // 2. MOBILE NUMBER VALIDATION: Valid 10-digit Indian mobile number
    const cleanMobile = mobile.replace(/\D/g, "");
    const indianMobileRegex = /^[6-9]\d{9}$/;
    if (!indianMobileRegex.test(cleanMobile)) {
      console.warn("🤖 Bot trap triggered: Invalid mobile number format");
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian mobile number (e.g. 9885034309)." },
        { status: 400 }
      );
    }

    // 3. SPAM KEYWORD CHECK: Evaluate text (name, message) separately from email address
    const textContent = `${name} ${message}`.toLowerCase();
    const emailContent = email.toLowerCase();

    const hasTextSpam = TEXT_SPAM_KEYWORDS.some((kw) => textContent.includes(kw));
    const hasEmailSpam = EMAIL_SPAM_KEYWORDS.some((kw) => emailContent.includes(kw));

    if (hasTextSpam || hasEmailSpam) {
      console.warn("🤖 Bot trap triggered: Spam keywords detected in submission");
      if (contentType.includes("application/json")) {
        return NextResponse.json({ success: true, message: "Request processed" });
      }
      return NextResponse.redirect(new URL("/get-quote?submitted=true", req.url));
    }

    // 4. NAME VALIDATION: Reject names containing marketing titles
    if (name.length > 50 || name.toLowerCase().includes("consultant") || name.toLowerCase().includes("agency")) {
      console.warn("🤖 Bot trap triggered: Suspicious name format");
      if (contentType.includes("application/json")) {
        return NextResponse.json({ success: true, message: "Request processed" });
      }
      return NextResponse.redirect(new URL("/get-quote?submitted=true", req.url));
    }

    if (!name || !cleanMobile) {
      return NextResponse.json({ error: "Name and valid mobile number are required." }, { status: 400 });
    }

    // Insert lead into Supabase
    const payload = {
      name,
      mobile: cleanMobile,
      email,
      pincode: pincode.replace(/\D/g, ""),
      service,
      message,
      home_type,
      requirement_type,
      material_quality,
      budget_range,
      rooms_selected,
      verified,
    };

    const { error } = await supabase.from("leads").insert(payload);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (contentType.includes("application/json")) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.redirect(new URL("/get-quote?submitted=true", req.url));
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}