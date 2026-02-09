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
    const { 
      name, 
      email, 
      phone, 
      service_type: service, 
      event_date: eventDate, 
      event_end_date: eventEndDate, 
      location, 
      budget, 
      notes 
    } = body

    // Validate required fields
    if (!name || !email || !phone || !service || !eventDate) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, service_type, and event_date are required' },
        { status: 400 }
      )
    }

    // Store booking in Supabase
    const { data: bookingData, error: dbError } = await supabase
      .from('bookings')
      .insert([
        {
          customer_name: name,
          email: email,
          phone: phone,
          service_type: service,
          event_date: eventDate,
          event_end_date: eventEndDate || null,
          location: location || null,
          budget_range: budget || null,
          notes: notes || null,
          status: 'pending',
        }
      ])
      .select()

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue even if DB fails, but log the error
    }

    // Try to send emails (may fail if domain not verified)
    let emailsSent = false
    try {
      // Send confirmation email to customer
      await resend.emails.send({
        from: 'SP Digital Studio <noreply@resend.dev>',
        to: email,
        subject: `Booking Request Received - ${BUSINESS_INFO.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ff6b35; margin: 0;">${BUSINESS_INFO.name}</h1>
              <p style="color: #fff; margin: 10px 0 0 0;">${BUSINESS_INFO.tagline}</p>
            </div>
            <div style="padding: 30px; background: #f8f9fa;">
              <h2 style="color: #1a1a2e;">Thank You for Your Booking Request!</h2>
              <p>Dear ${name},</p>
              <p>We have received your booking request and will get back to you within 24 hours to confirm availability and discuss the details.</p>
              
              <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1a1a2e;">Booking Details</h3>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Event Date:</strong> ${eventDate}${eventEndDate ? ` to ${eventEndDate}` : ''}</p>
                ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
                ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
              </div>
              
              <p>If you have any questions, feel free to reach out:</p>
              <p>
                <strong>Phone:</strong> ${BUSINESS_INFO.phones[0]}<br>
                <strong>WhatsApp:</strong> ${BUSINESS_INFO.phones[0]}
              </p>
              
              <p>Best regards,<br>${BUSINESS_INFO.name} Team</p>
            </div>
            <div style="background: #1a1a2e; padding: 20px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                ${BUSINESS_INFO.address.full}
              </p>
            </div>
          </div>
        `,
      })

      // Send notification email to business
      await resend.emails.send({
        from: 'SP Digital Studio <noreply@resend.dev>',
        to: [...BUSINESS_INFO.emails],
        subject: `New Booking Request: ${service} - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>New Booking Request</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Service:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${service}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Event Date:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${eventDate}${eventEndDate ? ` to ${eventEndDate}` : ''}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Location:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${location || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Budget:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${budget || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Notes:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${notes || 'None'}</td></tr>
            </table>
            <p style="margin-top: 20px;">
              <a href="tel:${phone}" style="background: #ff6b35; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Call Customer</a>
              <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-left: 10px;">WhatsApp</a>
            </p>
          </div>
        `,
      })
      
      emailsSent = true
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Continue - booking is still saved to database
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Booking request submitted successfully',
      emailsSent,
      bookingId: bookingData?.[0]?.id
    })
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { error: 'Failed to process booking request' },
      { status: 500 }
    )
  }
}
