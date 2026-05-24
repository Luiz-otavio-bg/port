import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_TO_EMAIL || "bgoficial2026@outlook.com";
const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo nao permitido" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Servico de e-mail nao configurado" });
  }

  const { name, email, projectType, message } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof projectType !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !isValidEmail(email) ||
    !projectType.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({ error: "Dados invalidos" });
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeProjectType = escapeHtml(projectType.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");
  const plainText = [
    "Nova mensagem do Portfolio",
    "",
    `Nome: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `Tipo de Projeto: ${projectType.trim()}`,
    "",
    message.trim(),
  ].join("\n");

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      replyTo: email.trim(),
      subject: `Novo Contato: ${name.trim()} - ${projectType.trim()}`,
      text: plainText,
      html: `
        <h1>Nova mensagem do Portfolio</h1>
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Tipo de Projeto:</strong> ${safeProjectType}</p>
        <p><strong>Mensagem:</strong> ${safeMessage}</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
}
