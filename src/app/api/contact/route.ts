import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { BUSINESS_INFO } from '@/lib/constants'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store inquiry in Supabase
    const { error: dbError } = await supabase
      .from('inquiries')
      .insert([
        {
          name: name,
          email: email,
          phone: phone || null,
          subject: subject || 'General Inquiry',
          message: message,
          status: 'new',
        }
      ])

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue even if DB fails
    }

    // Try to send emails
    let emailsSent = false
    try {
      // Send notification email to business
      await resend.emails.send({
        from: 'SP Digital Studio <noreply@resend.dev>',
        to: [...BUSINESS_INFO.emails],
        subject: `Contact Form: ${subject || 'General Inquiry'} - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>New Contact Form Submission</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Subject:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${subject || 'General Inquiry'}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; vertical-align: top;"><strong>Message:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${message}</td></tr>
            </table>
            <p style="margin-top: 20px;">
              <a href="mailto:${email}" style="background: #ff6b35; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reply to Email</a>
              ${phone ? `<a href="tel:${phone}" style="background: #1a1a2e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-left: 10px;">Call</a>` : ''}
              ${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-left: 10px;">WhatsApp</a>` : ''}
            </p>
          </div>
        `,
      })

      // Send confirmation email to customer
      await resend.emails.send({
        from: 'SP Digital Studio <noreply@resend.dev>',
        to: email,
        subject: `Message Received - ${BUSINESS_INFO.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ff6b35; margin: 0;">${BUSINESS_INFO.name}</h1>
            </div>
            <div style="padding: 30px; background: #f8f9fa;">
              <h2 style="color: #1a1a2e;">Thank You for Reaching Out!</h2>
              <p>Dear ${name},</p>
              <p>We have received your message and will get back to you as soon as possible, usually within 24 hours.</p>
              <p>If your inquiry is urgent, please call us directly:</p>
              <p style="font-size: 18px; font-weight: bold; color: #ff6b35;">${BUSINESS_INFO.phones[0]}</p>
              <p>Best regards,<br>${BUSINESS_INFO.name} Team</p>
            </div>
          </div>
        `,
      })
      
      emailsSent = true
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Continue - message is still saved
    }

    return NextResponse.json({ success: true, emailsSent })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
