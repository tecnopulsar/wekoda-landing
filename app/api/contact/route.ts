import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_TO = process.env.EMAIL_DESTINATARIO || "ingenieria@wetechar.com";
const EMAIL_FROM = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 });
  }

  const nombre = typeof body.nombre === "string" ? body.nombre.trim().slice(0, 120) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
  const empresa = typeof body.empresa === "string" ? body.empresa.trim().slice(0, 200) : "";
  const interes = typeof body.interes === "string" ? body.interes.trim().slice(0, 120) : "";
  const mensaje = typeof body.mensaje === "string" ? body.mensaje.trim().slice(0, 5000) : "";

  if (!nombre || !email || !mensaje) {
    return NextResponse.json(
      { error: "Nombre, email y mensaje son obligatorios." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email con formato inválido." }, { status: 400 });
  }

  const safeNombre = escapeHtml(nombre);
  const safeEmail = escapeHtml(email);
  const safeEmpresa = empresa ? escapeHtml(empresa) : "No especificada";
  const safeInteres = interes ? escapeHtml(interes) : "No especificado";
  const safeMensaje = escapeHtml(mensaje).replace(/\n/g, "<br/>");

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("contact: RESEND_API_KEY no configurada");
    return NextResponse.json(
      {
        error:
          "El envío de correo no está configurado en el servidor. Definí RESEND_API_KEY en Vercel (Environment Variables)."
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    replyTo: email,
    subject: interes
      ? `Nuevo contacto We Koda B2B — ${interes}: ${nombre}`
      : `Nuevo contacto We Koda B2B: ${nombre}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <h2 style="color: #0ea5e9; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
          Nuevo lead B2B — We Koda
        </h2>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nombre:</strong> ${safeNombre}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Empresa:</strong> ${safeEmpresa}</p>
          <p><strong>Interés:</strong> ${safeInteres}</p>
          <h3 style="margin-top: 20px;">Mensaje:</h3>
          <div style="background-color: white; padding: 15px; border-radius: 6px; border-left: 4px solid #0ea5e9;">
            ${safeMensaje}
          </div>
        </div>
        <p style="font-size: 12px; color: #94a3b8;">Enviado desde el formulario público de We Koda.</p>
      </div>
    `
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Fallo al procesar el envío. Intentá de nuevo más tarde." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
}
