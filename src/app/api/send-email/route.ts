import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'OptiMediX <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to OptiMediX - Your Journey to Advanced Medical Diagnostics Begins',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to OptiMediX AI</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: 'Arial', sans-serif;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #F8FAFC;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #FFFFFF; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 30px 40px; background-color: #3B82F6; border-radius: 12px 12px 0 0;">
                        <h1 style="color: #FFFFFF; margin: 0; font-size: 28px; font-weight: 700; text-align: center;">
                          Welcome to OptiMediX
                        </h1>
                      </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <p style="color: #1F2937; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
                          Dear ${name},
                        </p>
                        <p style="color: #1F2937; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
                          Thank you for joining the OptiMediX waitlist. We're thrilled to have you as part of our journey in transforming ocular and luma disease diagnostics through advanced AI technology.
                        </p>
                        
                        <!-- Features Box -->
                        <div style="background-color: #F3F4F6; border-radius: 8px; padding: 30px; margin: 30px 0;">
                          <h2 style="color: #3B82F6; margin: 0 0 20px 0; font-size: 20px;">Your Early Access Benefits</h2>
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="padding: 10px 0;">
                                <div style="display: flex; align-items: center;">
                                  <span style="color: #3B82F6; font-size: 20px; margin-right: 10px;">•</span>
                                  <span style="color: #4B5563; font-size: 16px;">Priority access to our AI-powered diagnostic platform</span>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0;">
                                <div style="display: flex; align-items: center;">
                                  <span style="color: #3B82F6; font-size: 20px; margin-right: 10px;">•</span>
                                  <span style="color: #4B5563; font-size: 16px;">Exclusive insights into our development process</span>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0;">
                                <div style="display: flex; align-items: center;">
                                  <span style="color: #3B82F6; font-size: 20px; margin-right: 10px;">•</span>
                                  <span style="color: #4B5563; font-size: 16px;">Special founding member pricing</span>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>

                        <p style="color: #1F2937; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
                          We'll keep you informed about our progress and notify you as soon as we're ready to welcome our first users. Stay tuned for exclusive updates about our revolutionary approach to medical diagnostics.
                        </p>

                        <p style="color: #1F2937; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
                          Best regards,<br>
                          <strong>The OptiMediX Team</strong>
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; background-color: #F8FAFC; border-top: 1px solid #E5E7EB; border-radius: 0 0 12px 12px;">
                        <p style="color: #6B7280; font-size: 12px; line-height: 18px; margin: 0; text-align: center;">
                          This email was sent to ${email}.<br>
                          If you didn't sign up for the OptiMediX waitlist, please disregard this email.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
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