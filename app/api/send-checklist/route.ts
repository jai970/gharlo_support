import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, city } = body

    // Validate required fields
    if (!name || !email || !phone || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save lead to Supabase
    const supabase = await createClient()
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{
        name,
        phone,
        email,
        city,
        source: 'checklist_download'
      }])

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    // Send to Make.com webhook (if configured)
    if (process.env.MAKE_WEBHOOK_URL) {
      try {
        await fetch(process.env.MAKE_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            city,
            source: 'checklist_download',
            timestamp: new Date().toISOString(),
            platform: 'gharlo_support'
          })
        })
        console.log('Lead sent to Make.com')
      } catch (makeError) {
        console.error('Make.com webhook error:', makeError)
        // Don't fail the request if Make.com fails
      }
    }

    // Send email with PDF attachment (only if Resend is configured)
    if (!resend) {
      console.log('Resend not configured, skipping email')
      return NextResponse.json({
        success: true,
        message: 'Lead saved successfully (email not configured)',
      })
    }

    const { data, error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: 'Your Construction Approval Checklist - Gharlo Support',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Gharlo Support</h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0;">Construction Approval Made Easy</p>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1f2937; margin-top: 0;">Hi ${name}! 👋</h2>
              
              <p style="color: #4b5563; font-size: 16px;">
                Thank you for downloading our <strong>Complete Construction Approval Checklist</strong>!
              </p>
              
              <p style="color: #4b5563; font-size: 16px;">
                This comprehensive guide will help you understand all the documents needed for construction approval in ${city}.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                <h3 style="color: #1f2937; margin-top: 0;">📋 What's Inside:</h3>
                <ul style="color: #4b5563; padding-left: 20px;">
                  <li>Complete document checklist</li>
                  <li>Step-by-step submission guide</li>
                  <li>Common rejection reasons</li>
                  <li>Timeline expectations</li>
                  <li>City-specific requirements</li>
                </ul>
              </div>
              
              <p style="color: #4b5563; font-size: 16px;">
                <strong>Note:</strong> The PDF checklist is attached to this email. If you don't see it, please check your spam folder.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}" 
                   style="background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
                  Visit Our Website
                </a>
              </div>
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                  <strong>💡 Need Help?</strong> Our experts are ready to assist you with your construction approval process.
                </p>
              </div>
              
              <h3 style="color: #1f2937;">Our Services:</h3>
              <ul style="color: #4b5563;">
                <li><strong>Document Review</strong> - ₹999</li>
                <li><strong>Full Approval Filing</strong> - ₹20,000 - ₹60,000</li>
                <li><strong>Consultation Call</strong> - ₹499</li>
                <li><strong>Cost Estimation</strong> - ₹499</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0; padding: 20px; background: white; border-radius: 8px;">
                <p style="color: #4b5563; margin: 0 0 15px 0;">Get in touch with us:</p>
                <a href="tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}" 
                   style="color: #10b981; text-decoration: none; font-weight: 600; margin-right: 20px;">
                  📞 Call Us
                </a>
                <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}" 
                   style="color: #10b981; text-decoration: none; font-weight: 600;">
                  💬 WhatsApp
                </a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Best regards,<br>
                <strong>Team Gharlo Support</strong>
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p>© ${new Date().getFullYear()} Gharlo Support. All rights reserved.</p>
              <p>
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/privacy" style="color: #9ca3af; text-decoration: none;">Privacy Policy</a> | 
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/terms" style="color: #9ca3af; text-decoration: none;">Terms of Service</a>
              </p>
            </div>
          </body>
        </html>
      `,
      // Attach PDF - You'll need to add the actual PDF file
      attachments: [
        {
          filename: 'construction-approval-checklist.pdf',
          path: `${process.env.NEXT_PUBLIC_SITE_URL}/documents/approval-checklist.pdf`,
        },
      ],
    })

    if (emailError) {
      console.error('Email error:', emailError)
      return NextResponse.json(
        { error: 'Failed to send email', details: emailError },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      emailId: data?.id
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
