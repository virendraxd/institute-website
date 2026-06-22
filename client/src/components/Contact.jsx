import React from 'react'
import Divider from './Divider'

function Contact() {
  return (
    <section id="contact" className="section-padding bg-(--bg-page)">
      <h2 className="section-heading">Contact Us</h2>
      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-(--brand-primary) mb-6">Get in Touch</h3>
            <p className="text-gray-600 mb-8">
              Have questions about our courses or admission process? Feel free to reach out to us. Our team will get back to you as soon as possible.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-(--brand-secondary)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Address</h4>
                <p className="text-gray-600">123, Education Hub, Near Knowledge Park, City - 400001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-(--brand-secondary)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Phone</h4>
                <p className="text-gray-600">+91 98765 43210, +91 12345 67890</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-(--brand-secondary)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Email</h4>
                <p className="text-gray-600">info@knightacademy.com, admissions@knightacademy.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="h-75 sm:h-100 bg-gray-200 rounded-3xl overflow-hidden shadow-inner relative group">
          <iframe
            src="https://maps.google.com/maps?q=Gwalior%20Fort&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full rounded-xl border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default Contact
