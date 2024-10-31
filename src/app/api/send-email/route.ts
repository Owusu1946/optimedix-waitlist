// app/api/send-email/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'OptiMediX <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to OptiMediX Waitlist!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3B82F6;">Welcome to OptiMediX Waitlist, ${name} 🎉!</h1>
          <p>Hello ${name},</p>
          <p>Thank you for joining our waitlist! We're excited to have you on board as we revolutionize ocular and luma disease diagnostics with AI.</p>
          <p>We'll keep you updated on our progress and notify you as soon as OptiMediX becomes available.</p>
          <div style="margin: 30px 0; padding: 20px; background: #F3F4F6; border-radius: 8px;">
            <h2 style="color: #3B82F6; margin-top: 0;">What's Next?</h2>
            <ul style="padding-left: 20px;">
              <li>Stay tuned for exclusive updates</li>
              <li>Early access to our platform</li>
              <li>Special launch offers</li>
            </ul>
          </div>
          <p>Best regards,<br>The OptiMediX Team</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280;">
            <p>This email was sent to ${email}. If you didn't sign up for OptiMediX waitlist, please ignore this email.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}