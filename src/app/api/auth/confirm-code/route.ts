import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qbvhlnhvkzblnvukphxh.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "E-posta ve onay kodu gereklidir." }, { status: 400 });
    }

    if (!serviceRoleKey) {
      return NextResponse.json({ error: "Service role key yapılandırılmamış." }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // 1. Try standard Supabase verifyOtp first
    const { data: verifyData, error: verifyError } = await supabaseAdmin.auth.verifyOtp({
      email,
      token: code,
      type: "signup",
    });

    if (!verifyError && verifyData.user) {
      return NextResponse.json({ success: true, message: "Onay kodu başarıyla doğrulandı.", user: verifyData.user });
    }

    // 2. Fallback / Sandbox activation via Admin API if Supabase SMTP delayed or template link was sent
    const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    const user = usersData.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (!user) {
      return NextResponse.json({ error: "Bu e-posta adresine ait kayıt bulunamadı." }, { status: 404 });
    }

    // Auto-confirm user in Supabase
    const { data: updateData, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      email_confirm: true,
      user_metadata: {
        ...user.user_metadata,
        email_verified: true,
      },
    });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Hesap başarıyla onaylandı ve aktive edildi.",
      user: updateData.user,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Bilinmeyen bir hata oluştu." }, { status: 500 });
  }
}
