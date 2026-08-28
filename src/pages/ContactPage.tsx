import React, { useState } from 'react';
import { Footer } from '../components/Footer/Footer';
import { SEOHead } from '../components/UI/SEOHead';

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <SEOHead title="Contact | Zen Arohanc Collection" />
      
      <div className="flex-grow py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-5xl font-bold text-center text-slate-900 mb-16">Get in Touch</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 shadow-sm rounded-lg">
              {submitted ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-md text-center">
                  <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                  <p>Your message has been received. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea 
                      id="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-slate-900 text-white font-semibold py-4 rounded-md hover:bg-slate-800 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="flex flex-col space-y-10">
              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-4">Contact Information</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Have a question about our products or your order? We're here to help. Reach out to us using any of the methods below.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4 text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">Email</h4>
                    <p className="text-slate-600 mt-1">hello@zenarohanc.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4 text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">Phone</h4>
                    <p className="text-slate-600 mt-1">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4 text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">Address</h4>
                    <p className="text-slate-600 mt-1">
                      123 Wellness Way<br/>
                      Portland, OR 97205<br/>
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-200">
                <h4 className="font-semibold text-slate-900 text-lg mb-2">Business Hours</h4>
                <p className="text-slate-600">
                  Monday - Friday: 9am - 5pm PST<br/>
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
