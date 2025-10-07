"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  IdCard, 
  MessageSquareText,
  Calendar,
  Rocket,
  Handshake,
  PiggyBank,
  MessageCircle,
  Info,
  Send,
  ArrowLeft
} from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  org: string;
  role: string;
  message: string;
  topics: string[];
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
  consent?: string;
}

export default function TempPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    org: "",
    role: "",
    message: "",
    topics: [],
    consent: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const questionTypes = [
    { id: 'demo', label: 'Schedule a demo', icon: Calendar },
    { id: 'pilot', label: 'Learn more about pilots', icon: Rocket },
    { id: 'partnership', label: 'Partnership inquiry', icon: Handshake },
    { id: 'investor', label: 'Investor/funding inquiry', icon: PiggyBank },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
    { id: 'general', label: 'General question / other', icon: Info }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (!formData.consent) {
      newErrors.consent = "You must agree to be contacted";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.getElementById(firstError);
        element?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        org: formData.org,
        role: formData.role,
        message: formData.message,
        topics: formData.topics,
        consent: formData.consent
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          org: "",
          role: "",
          message: "",
          topics: [],
          consent: false
        });
      } else {
        const errorData = await res.json();
        console.error('Form submission error:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTopicChange = (topicId: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topicId)
        ? prev.topics.filter(t => t !== topicId)
        : [...prev.topics, topicId]
    }));
  };

  return (
    <section id="section-6" className="min-h-screen bg-black flex items-center justify-center px-4 py-24 md:py-28">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => window.close()}
          className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-clash text-sm hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-conic from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="lg:grid lg:grid-cols-5 lg:gap-8">
          {/* Left Column - Headline + About + Quick Info */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <h2 id="contact-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-white font-clash mb-6">
                Contact OPEF
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                Please fill out the form and a member of our team will get back to you shortly.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-zinc-300/90 inline-flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>hello@opef.ai</span>
              </div>
              <div className="text-sm text-zinc-300/90 inline-flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="text-sm text-zinc-300/90 inline-flex items-center gap-2">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                <span>opef.ai</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form Card */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-zinc-950/60 backdrop-blur-sm border border-zinc-800/70 rounded-2xl p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white font-clash mb-2">Get in Touch</h3>
                <p className="text-sm text-zinc-400">Tell us about your project and we&apos;ll get back to you.</p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm">
                    Thanks — we&apos;ll get back to you within 1–2 business days.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">
                    There was an error submitting your message. Please try again.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" aria-hidden="true" />
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full pl-9 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                      placeholder="Enter your full name"
                      aria-invalid={errors.fullName ? 'true' : 'false'}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    />
                  </div>
                  {errors.fullName && (
                    <p id="fullName-error" className="mt-1 text-xs text-red-400" role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" aria-hidden="true" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-9 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                      placeholder="Enter your email address"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" aria-hidden="true" />
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full pl-9 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <label htmlFor="org" className="block text-sm font-medium text-white mb-2">
                    Organization / Company
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" aria-hidden="true" />
                    <input
                      type="text"
                      id="org"
                      value={formData.org}
                      onChange={(e) => setFormData(prev => ({ ...prev, org: e.target.value }))}
                      className="w-full pl-9 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                      placeholder="Enter your organization"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                    Role / Title
                  </label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" aria-hidden="true" />
                    <input
                      type="text"
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full pl-9 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none"
                      placeholder="Enter your role or title"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquareText className="absolute left-3 top-3 h-4 w-4 text-zinc-500" aria-hidden="true" />
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      className="w-full pl-9 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:outline-none min-h-[120px] resize-vertical"
                      placeholder="Tell us about your project or inquiry..."
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                  </div>
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Question Type */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Question Type
                  </label>
                  <div className="md:grid md:grid-cols-2 gap-3">
                    {questionTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <label key={type.id} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.topics.includes(type.id)}
                            onChange={() => handleTopicChange(type.id)}
                            className="w-4 h-4 text-blue-600 bg-zinc-900 border-zinc-800 rounded focus:ring-zinc-400 focus:ring-2"
                          />
                          <IconComponent className="h-4 w-4 text-zinc-500" aria-hidden="true" />
                          <span className="text-sm text-zinc-300">{type.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Consent */}
                <div>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 bg-zinc-900 border-zinc-800 rounded focus:ring-zinc-400 focus:ring-2 mt-0.5"
                      aria-invalid={errors.consent ? 'true' : 'false'}
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                    />
                    <div>
                      <span className="text-sm text-zinc-300">
                        I agree to be contacted by OPEF regarding my inquiry *
                      </span>
                      <p className="text-xs text-zinc-400 mt-1">
                        We respect your privacy. Your information will only be used to respond to your inquiry.
                      </p>
                      {errors.consent && (
                        <p id="consent-error" className="mt-1 text-xs text-red-400" role="alert">
                          {errors.consent}
                        </p>
                      )}
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="relative">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full rounded-full px-5 h-11 font-medium bg-white text-black hover:scale-[1.01] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-lg opacity-0 hover:opacity-100 transition-opacity duration-200" />
                    <div className="flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {isSubmitting ? 'Sending...' : 'Contact Us'}
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
