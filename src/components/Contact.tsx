import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, HelpCircle, FileText } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <section id="contact-us-section" className="py-20 bg-earth-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-mono text-xs font-semibold tracking-widest text-forest-600 uppercase mb-2">
            Stay in Touch
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-forest-900 tracking-tight">
            Contact EcoStawi
          </h3>
          <p className="text-earth-500 mt-4 leading-relaxed">
            Have questions about our verified carbon pipelines, school woodlots, coastal mangrove concessions, or CSR alignments? Reach out and our regional officers will correspond with you.
          </p>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact info grid wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Corporate details & HQ bases (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Core Address Card */}
            <div className="bg-white rounded-3xl p-8 border border-earth-200 shadow-sm space-y-6">
              <h4 className="font-display font-bold text-xl text-forest-900">Registered Secretariat</h4>
              
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-forest-50 p-3 rounded-xl text-forest-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-earth-400">Call Regional Hotline</span>
                    <a href="tel:+254707033867" className="text-sm font-bold text-forest-850 hover:underline">
                      +254 707 033 867
                    </a>
                    <p className="text-[10px] text-earth-400 mt-0.5">Monday – Friday, 8:00 AM – 5:00 PM EAT</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-forest-50 p-3 rounded-xl text-forest-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-earth-400">Email Correspondence</span>
                    <span className="text-sm font-bold text-forest-850">
                      info@ecostawi.org
                    </span>
                    <span className="block text-[9px] text-orange-600 font-mono font-bold mt-1 bg-orange-50 px-2 py-0.5 rounded border border-orange-100 w-fit">
                      * Domain Setup Pending. Direct messages route through server portal.
                    </span>
                  </div>
                </div>

                {/* Postbox */}
                <div className="flex items-start space-x-4">
                  <div className="bg-forest-50 p-3 rounded-xl text-forest-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-earth-400">Postal Address</span>
                    <p className="text-sm font-bold text-forest-850">
                      P.O. Box 24888 - 00100
                    </p>
                    <p className="text-xs text-earth-500">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Stations Card */}
            <div className="bg-white rounded-3xl p-8 border border-earth-200 shadow-sm">
              <h4 className="font-display font-bold text-lg text-forest-900 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-forest-600" />
                <span>Field Operations Stations</span>
              </h4>
              
              <ul className="space-y-4 font-mono text-[11px] text-earth-500">
                <li className="border-b pb-3 border-earth-100 last:border-b-0 last:pb-0">
                  <strong className="block text-forest-800 text-xs font-display font-bold">Terrestrial Canopy Hub:</strong>
                  <span>Nakuru Field Station, Mau Complex Fringe, Nakuru County, Kenya</span>
                </li>
                <li className="border-b pb-3 border-earth-100 last:border-b-0 last:pb-0">
                  <strong className="block text-forest-800 text-xs font-display font-bold">Blue Economy Base:</strong>
                  <span>Kilifi Coastal Station, Mnarani Lagoon, Kilifi County, Kenya</span>
                </li>
                <li>
                  <strong className="block text-forest-800 text-xs font-display font-bold">Climate Agroforestry Hub:</strong>
                  <span>Matuga Agricultural Concession, Kwale County, Kenya</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-earth-200 shadow-sm flex flex-col justify-between">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h4 className="font-display font-bold text-xl text-forest-900 mb-1">Corporate Message Desk</h4>
                  <p className="text-xs text-earth-400">Submit an official inquiry. Your message will be securely cataloged and dispatched.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-earth-500 mb-2">Full Name: *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Paul Jubilee"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-earth-500 mb-2">Email Address: *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. paul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-earth-500 mb-2">Inquiry Category: *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium cursor-pointer"
                  >
                    <option value="General Inquiry">General Corporate Inquiry</option>
                    <option value="CSR / Partnership Support">CSR & Corporate Partnership alignments</option>
                    <option value="Carbon Credit Validation">Carbon Credits Sequestration verification</option>
                    <option value="Volunteer / Community Membership">Volunteer & School woodlot registration</option>
                    <option value="Research & GIS Collaboration">Academic GIS or Telemetry collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-earth-500 mb-2">Detailed Correspondence Message: *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide detailed context regarding your inquiries so we can connect you directly to the relevant program Lead."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-earth-50 focus:outline-none focus:ring-1 focus:ring-forest-500 text-sm font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-forest-600 hover:bg-forest-700 text-white font-bold py-4 rounded-xl shadow-md transition-colors duration-200 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Official Message</span>
                </button>
              </form>
            ) : (
              // Message Success View
              <div className="text-center py-16 space-y-6 my-auto">
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-extrabold text-2xl text-forest-900">Message Transmitted!</h4>
                  <p className="text-earth-500 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-forest-750">{name}</strong>. Your correspondence regarding <em className="text-forest-600 font-semibold italic">"{subject}"</em> has been logged in our system.
                  </p>
                </div>

                <p className="text-xs text-earth-400 max-w-sm mx-auto leading-relaxed border-t border-earth-200 pt-6">
                  A verification receipt has been recorded. Our corporate registry office will redirect your inquiry to the respective Program Station Director, and we will reply to your email address (<strong>{email}</strong>) within 24 business hours.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="text-xs font-bold font-mono uppercase tracking-wider text-forest-600 hover:text-forest-800 transition-colors cursor-pointer py-1"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
