"use client"

import { motion } from "framer-motion"
import { FileCheck, Building2, Phone, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ServicesSection() {
  const services = [
    {
      icon: FileCheck,
      title: "Document Review",
      price: "₹999",
      description: "Complete verification of all required documents before submission",
      features: ["Checklist verification", "Error detection", "Correction guidance"]
    },
    {
      icon: Building2,
      title: "Full Approval Filing",
      price: "₹5,000", // Updated competitive pricing
      description: "End-to-end approval process management from start to finish",
      features: ["Document preparation", "Government submission", "Weekly tracking"],
      popular: true
    },
    {
      icon: Phone,
      title: "Consultation Call",
      price: "₹499",
      description: "30-minute expert consultation for your construction queries",
      features: ["Expert guidance", "Process clarity", "Timeline estimation"]
    },
    {
      icon: Calculator,
      title: "Cost Estimation",
      price: "₹499",
      description: "Detailed construction cost breakdown and budget planning",
      features: ["Material costs", "Labor estimates", "Timeline planning"]
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the support you need — from quick reviews to full approval management
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow ${
                  service.popular ? 'ring-2 ring-emerald-600' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>

                <div className="text-2xl font-bold text-emerald-600 mb-3">
                  {service.price}
                </div>

                <p className="text-sm text-slate-600 mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  variant={service.popular ? "default" : "outline"}
                >
                  Book Now
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
