import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { name, email, projectType, message } = req.body;

    try {
        const data = await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>', 
        to: ['bgoficial2026@outlook.com'], 
        subject: `Novo Contato: ${name} - ${projectType}`,
        html: `
            <h1>Nova mensagem do Portfolio</h1>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Tipo de Projeto:</strong> ${projectType}</p>
            <p><strong>Mensagem:</strong> ${message}</p>
        `,
        });

        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao enviar e-mail' });
    }
}