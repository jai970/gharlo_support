"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const sendOTP = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${phone}`,
      })
      
      if (error) throw error
      
      setStep('otp')
      alert('OTP sent to your phone!')
    } catch (error: any) {
      alert(error.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const verifyOTP = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: `+91${phone}`,
        token: otp,
        type: 'sms'
      })
      
      if (error) throw error
      
      router.push('/dashboard')
    } catch (error: any) {
      alert(error.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Client Login
        </h1>
        <p className="text-slate-600 mb-8">
          Track your construction approval status
        </p>

        {step === 'phone' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-slate-100 rounded-lg text-slate-600">
                  +91
                </div>
                <Input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength={10}
                />
              </div>
            </div>

            <Button 
              onClick={sendOTP}
              disabled={phone.length !== 10 || loading}
              className="w-full"
              size="lg"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>

            <p className="text-xs text-slate-500 text-center">
              Note: Phone authentication requires Supabase phone provider setup
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter OTP
              </label>
              <Input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
              />
            </div>

            <Button 
              onClick={verifyOTP}
              disabled={otp.length !== 6 || loading}
              className="w-full"
              size="lg"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>

            <Button 
              onClick={() => setStep('phone')}
              variant="ghost"
              className="w-full"
            >
              Change Number
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
