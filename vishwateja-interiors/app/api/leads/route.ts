import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Server-side client using same public keys (leads table allows public insert via RLS policy)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name")?.toString() || "";
    const mobile = formData.get("mobile")?.toString() || "";
    const service = formData.get("service")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    if (!name || !mobile) {
      return NextResponse.json({ error: "Name and mobile are required." }, { status: 400 });
    }

    const { error } = await supabase.from("leads").insert({
      name,
      mobile,
      service,
      message,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Redirect back with a success flag
    return NextResponse.redirect(new URL("/get-quote?submitted=true", req.url));
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}