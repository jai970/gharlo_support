import { NextRequest, NextResponse } from 'next/server'

/**
 * Webhook endpoint for Make.com integration
 * This receives lead data and forwards it to Make.com for automation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate webhook secret for security
    const webhookSecret = request.headers.get('x-webhook-secret')
    if (webhookSecret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get Make.com webhook URL from environment
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL
    
    if (!makeWebhookUrl) {
      console.log('Make.com webhook not configured')
      return NextResponse.json({
        success: true,
        message: 'Webhook not configured'
      })
    }

    // Forward data to Make.com
    const response = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        timestamp: new Date().toISOString(),
        source: 'gharlo_support'
      })
    })

    if (!response.ok) {
      throw new Error(`Make.com webhook failed: ${response.statusText}`)
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: 'Webhook sent to Make.com',
      makeResponse: result
    })

  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook failed', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint for testing webhook connectivity
 */
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'Make.com webhook endpoint is ready',
    configured: !!process.env.MAKE_WEBHOOK_URL
  })
}
