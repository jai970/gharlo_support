import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Test connection by fetching leads
    const { data, error, count } = await supabase
      .from('leads')
      .select('*', { count: 'exact' })
      .limit(10)
    
    if (error) {
      return NextResponse.json({ 
        success: false,
        error: error.message,
        hint: 'Make sure you ran the schema.sql in Supabase SQL Editor'
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Database connection successful!',
      totalLeads: count,
      recentLeads: data,
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    return NextResponse.json({ 
      success: false,
      error: error.message,
      hint: 'Check your Supabase credentials in .env.local'
    }, { status: 500 })
  }
}
