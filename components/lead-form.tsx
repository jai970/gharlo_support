"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download } from "lucide-react"

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
  email: z.string().email("Enter valid email"),
  city: z.string().min(2, "City is required"),
})

type LeadFormData = z.infer<typeof leadSchema>

export function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema)
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    
    try {
      // Call API to save lead and send email
      const response = await fetch('/api/send-checklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('API Error:', result)
        throw new Error(result.error || 'Failed to send checklist')
      }

      setSubmitted(true)
      reset()
      
      // Only try to download PDF if it exists
      // You can enable this once you create the PDF file
      // window.open('/documents/approval-checklist.pdf', '_blank')
      
    } catch (error: any) {
      console.error('Error submitting form:', error)
      const errorMessage = error.message || 'Something went wrong. Please try again or contact us directly.'
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Download className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Thank You! 🎉
        </h3>
        <p className="text-slate-600 mb-4">
          Your request has been received successfully!
          <br />
          <span className="text-sm text-slate-500">
            Our team will contact you shortly via WhatsApp or phone.
          </span>
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Submit Another Request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register("name")}
          placeholder="Your Name *"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register("phone")}
          placeholder="Mobile Number *"
          type="tel"
          maxLength={10}
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register("email")}
          placeholder="Email *"
          type="email"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register("city")}
          placeholder="Your City *"
          className={errors.city ? "border-red-500" : ""}
        />
        {errors.city && (
          <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Get Free Checklist"}
        <Download className="w-5 h-5" />
      </Button>

      <p className="text-xs text-slate-500 text-center">
        We'll send you helpful tips via WhatsApp. No spam, promise!
      </p>
    </form>
  )
}
