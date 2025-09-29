import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, org, role, message, topics, consent } = body;

    if (!fullName || !email || !message || !consent) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    console.log('Sending emails with config:', {
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO,
      customerEmail: email
    });

    // Founder email
    const founderEmailResult = await resend.emails.send({
      from: process.env.CONTACT_FROM!,
      to: process.env.CONTACT_TO!,
      subject: `🔔 New OPEF Contact Form Submission — ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New OPEF Contact</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; text-align: center;">
              <img src="https://opef.ai/opef-logo-final.svg" alt="OPEF Logo" style="height: 50px; width: auto; margin-bottom: 15px;" />
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <div style="background-color: #e8f4fd; border-left: 4px solid #007bff; padding: 20px; margin-bottom: 25px; border-radius: 0 6px 6px 0;">
                <h2 style="color: #1a1a1a; margin: 0 0 10px 0; font-size: 20px;">Contact Details</h2>
                <p style="color: #4a4a4a; margin: 5px 0; font-size: 16px;"><strong>Name:</strong> ${fullName}</p>
                <p style="color: #4a4a4a; margin: 5px 0; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
                ${phone ? `<p style="color: #4a4a4a; margin: 5px 0; font-size: 16px;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #007bff; text-decoration: none;">${phone}</a></p>` : ''}
                ${org ? `<p style="color: #4a4a4a; margin: 5px 0; font-size: 16px;"><strong>Organization:</strong> ${org}</p>` : ''}
                ${role ? `<p style="color: #4a4a4a; margin: 5px 0; font-size: 16px;"><strong>Role:</strong> ${role}</p>` : ''}
                ${topics && topics.length > 0 ? `<p style="color: #4a4a4a; margin: 5px 0; font-size: 16px;"><strong>Topics:</strong> ${topics.join(", ")}</p>` : ''}
              </div>
              
              <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; padding: 20px; border-radius: 6px;">
                <h3 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
                <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 600; font-size: 16px; margin-right: 10px;">
                  Reply to ${fullName}
                </a>
                <a href="https://opef.ai" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  View Website
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; font-size: 12px; margin: 0;">
                This notification was sent because someone submitted the contact form on OPEF.ai
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });

    console.log('Founder email result:', founderEmailResult);

    // Auto-reply to sender (confirmation email)
    const confirmationEmailResult = await resend.emails.send({
      from: process.env.CONTACT_FROM!,
      to: email,
      subject: "Thank you for contacting OPEF — We'll be in touch soon",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OPEF Contact Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header with Logo -->
            <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 30px; text-align: center;">
              <img src="https://opef.ai/opef-logo-final.svg" alt="OPEF Logo" style="height: 60px; width: auto; margin-bottom: 20px;" />
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">OPEF</h1>
              <p style="color: #a0a0a0; margin: 8px 0 0 0; font-size: 16px;">AI-Powered Environmental Compliance</p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Thank you for reaching out!</h2>
              
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi ${fullName},
              </p>
              
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for your interest in OPEF. We've received your message and someone from our team will be in contact with you within 1-2 business days to discuss your inquiry.
              </p>
              
              <!-- Inquiry Summary -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #1a1a1a; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Your Inquiry Summary</h3>
                <div style="color: #4a4a4a; font-size: 14px; line-height: 1.5;">
                  <p style="margin: 5px 0;"><strong>Name:</strong> ${fullName}</p>
                  <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                  ${org ? `<p style="margin: 5px 0;"><strong>Organization:</strong> ${org}</p>` : ''}
                  ${role ? `<p style="margin: 5px 0;"><strong>Role:</strong> ${role}</p>` : ''}
                  ${phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
                  ${topics && topics.length > 0 ? `<p style="margin: 5px 0;"><strong>Topics of Interest:</strong> ${topics.join(", ")}</p>` : ''}
                </div>
              </div>
              
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                In the meantime, feel free to explore our platform and learn more about how OPEF is revolutionizing environmental compliance through AI-powered solutions.
              </p>
              
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                If you have any urgent questions, please don't hesitate to reach out directly.
              </p>
              
              <!-- Call to Action -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://opef.ai" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  Visit OPEF.ai
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #6c757d; font-size: 14px; margin: 0 0 10px 0;">
                <strong>Best regards,</strong><br/>
                The OPEF Team
              </p>
              <p style="color: #6c757d; font-size: 12px; margin: 0;">
                This email was sent to ${email} because you contacted us through our website.
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });

    console.log('Confirmation email result:', confirmationEmailResult);

    return NextResponse.json({ 
      ok: true, 
      founderEmailId: founderEmailResult.data?.id,
      confirmationEmailId: confirmationEmailResult.data?.id
    });
  } catch (e) {
    console.error('Email sending error:', e);
    return NextResponse.json({ 
      ok: false, 
      error: "Failed to send", 
      details: e instanceof Error ? e.message : 'Unknown error'
    }, { status: 500 });
  }
}
