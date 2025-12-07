"use client"

import { motion } from "framer-motion"
import { Download, FileText, CheckCircle2 } from "lucide-react"
import { LeadForm } from "./lead-form"

export function FreeChecklistSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-600 to-emerald-700">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Free Complete Approval Checklist
              </h2>
              
              <p className="text-lg text-emerald-50 mb-6">
                Don't start your construction without this! Download our comprehensive 
                checklist covering all documents needed for approval.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "City-wise document requirements",
                  "Step-by-step submission guide",
                  "Common rejection reasons",
                  "Timeline expectations"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-200 flex-shrink-0" />
                    <span className="text-emerald-50">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 text-sm text-emerald-100">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>5,000+ downloads</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-emerald-300" />
                <span>Updated for 2024</span>
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-2xl"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Get Your Free PDF
                </h3>
                <p className="text-slate-600">
                  Enter your details to download instantly
                </p>
              </div>

              <LeadForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
