import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET - Fetch approved testimonials
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ testimonials: data })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

// POST - Submit a new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, service, rating, text } = body

    // Validate required fields
    if (!name || !email || !rating || !text) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, rating, and text are required' },
        { status: 400 }
      )
    }

    // Insert into database (not approved by default)
    const { data, error } = await supabase
      .from('testimonials')
      .insert([
        {
          name: name,
          email: email,
          service: service || null,
          rating: rating,
          text: text,
          approved: false, // Requires admin approval
          featured: false,
        }
      ])
      .select()

    if (error) {
      console.error('Database error:', error)
      throw error
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you! Your review has been submitted and will appear after approval.',
      data 
    })
  } catch (error) {
    console.error('Error submitting testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to submit testimonial. Please try again.' },
      { status: 500 }
    )
  }
}
