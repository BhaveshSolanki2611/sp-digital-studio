import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { BUSINESS_INFO } from '@/lib/constants'

const resend = new Resend(process.env.RESEND_API_KEY)

// Create a server-side Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

interface OrderItem {
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  options?: Record<string, string> | null
}

interface OrderRequest {
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address: string | null
  pickup_option: boolean
  payment_method: 'razorpay' | 'paypal' | 'upi' | 'cod'
  payment_id: string
  payment_status: 'pending' | 'completed'
  subtotal: number
  shipping: number
  tax: number
  total: number
  notes: string
  items: OrderItem[]
}

export async function POST(request: Request) {
  try {
    const body: OrderRequest = await request.json()

    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      pickup_option,
      payment_method,
      payment_id,
      payment_status,
      subtotal,
      shipping,
      tax,
      total,
      notes,
      items,
    } = body

    // Validate required fields
    if (!customer_name || !customer_email || !customer_phone) {
      return NextResponse.json(
        { error: 'Customer name, email, and phone are required' },
        { status: 400 }
      )
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      )
    }

    // Generate order ID - will be replaced by Supabase ID if insert succeeds
    let orderId = `SP-${Date.now()}`
    
    // Try to save to Supabase (may fail if tables don't exist yet)
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      const orderData = {
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        pickup_option,
        payment_method,
        payment_id,
        payment_status,
        subtotal,
        shipping,
        tax,
        total,
        notes,
        status: 'pending',
      }
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select('id')
        .single()

      if (orderError) {
        console.error('Supabase order error:', orderError)
        // Continue without database - just send emails
      } else if (order) {
        orderId = order.id
        
        // Insert order items
        const orderItems = items.map((item) => ({
          order_id: order.id,
          product_id: item.product_id,
          product_name: item.product_name,
          quantity: item.quantity,
          unit_price: item.unit_price,
          options: item.options,
        }))

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems)

        if (itemsError) {
          console.error('Supabase order items error:', itemsError)
        }
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
      // Continue without database
    }

    // Format items for email
    const itemsHtml = items
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.product_name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.unit_price.toLocaleString('en-IN')}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.unit_price * item.quantity).toLocaleString('en-IN')}</td>
        </tr>
      `
      )
      .join('')

    // Send confirmation email to customer
    try {
      await resend.emails.send({
        from: 'SP Digital Studio <noreply@resend.dev>',
        to: customer_email,
        subject: `Order Confirmation - ${orderId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #800000, #a52a2a); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0;">Order Confirmed!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your order</p>
            </div>
            
            <div style="padding: 30px; background: #fff; border: 1px solid #eee; border-radius: 0 0 10px 10px;">
              <p>Dear ${customer_name},</p>
              <p>Your order has been successfully placed. Here are the details:</p>
              
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Order ID:</strong> ${orderId}</p>
                <p style="margin: 0 0 10px 0;"><strong>Payment Method:</strong> ${payment_method.toUpperCase()}</p>
                <p style="margin: 0;"><strong>Payment Status:</strong> ${payment_status === 'completed' ? '✅ Paid' : '⏳ Pending'}</p>
              </div>
              
              <h3 style="color: #800000; border-bottom: 2px solid #800000; padding-bottom: 10px;">Order Items</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f5f5f5;">
                    <th style="padding: 10px; text-align: left;">Item</th>
                    <th style="padding: 10px; text-align: center;">Qty</th>
                    <th style="padding: 10px; text-align: right;">Price</th>
                    <th style="padding: 10px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="padding: 10px; text-align: right;">Subtotal:</td>
                    <td style="padding: 10px; text-align: right;">₹${subtotal.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 10px; text-align: right;">Shipping:</td>
                    <td style="padding: 10px; text-align: right;">${shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</td>
                  </tr>
                  <tr style="font-size: 18px; font-weight: bold; color: #800000;">
                    <td colspan="3" style="padding: 10px; text-align: right;">Total:</td>
                    <td style="padding: 10px; text-align: right;">₹${total.toLocaleString('en-IN')}</td>
                  </tr>
                </tfoot>
              </table>
              
              <div style="background: #fff8e7; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <h4 style="margin: 0 0 10px 0; color: #800000;">
                  ${pickup_option ? '🏪 Store Pickup' : '🚚 Home Delivery'}
                </h4>
                <p style="margin: 0;">
                  ${pickup_option 
                    ? `Pick up your order from: ${BUSINESS_INFO.address.full}` 
                    : `Delivery Address: ${shipping_address}`
                  }
                </p>
              </div>
              
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                If you have any questions, please contact us at:
                <br />📞 ${BUSINESS_INFO.phones[0]}
                <br />📧 ${BUSINESS_INFO.emails[0]}
              </p>
              
              <p style="color: #666; font-size: 14px;">
                Thank you for choosing SP Digital Studio & Color Lab!
              </p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Customer email error:', emailError)
    }

    // Send notification to business
    try {
      await resend.emails.send({
        from: 'SP Digital Studio <noreply@resend.dev>',
        to: BUSINESS_INFO.emails[0],
        subject: `🛒 New Order - ${customer_name} - ₹${total.toLocaleString('en-IN')}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #800000;">New Order Received!</h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Customer:</strong> ${customer_name}</p>
              <p><strong>Email:</strong> ${customer_email}</p>
              <p><strong>Phone:</strong> ${customer_phone}</p>
              <p><strong>Delivery:</strong> ${pickup_option ? 'Store Pickup' : `Shipping to: ${shipping_address}`}</p>
              <p><strong>Payment:</strong> ${payment_method.toUpperCase()} - ${payment_status === 'completed' ? 'PAID' : 'PENDING'}</p>
              ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
            </div>
            
            <h3>Order Items:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #800000; color: white;">
                  <th style="padding: 10px; text-align: left;">Item</th>
                  <th style="padding: 10px; text-align: center;">Qty</th>
                  <th style="padding: 10px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${items.map((item) => `
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.product_name}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.unit_price * item.quantity).toLocaleString('en-IN')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background: #800000; color: white; text-align: center; border-radius: 8px;">
              <strong style="font-size: 24px;">Total: ₹${total.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Business email error:', emailError)
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Order placed successfully',
    })
  } catch (error) {
    console.error('Order API error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}
