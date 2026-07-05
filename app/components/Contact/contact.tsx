"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const ContactForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form:", form);
    setSubmitted(true);
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center text-center py-16"
        >
          <div className="w-14 h-14 rounded-full border border-border-soft text-primary flex items-center justify-center mb-5">
            <Check size={26} strokeWidth={2} />
          </div>
          <p className="text-text font-medium mb-1.5">Message sent</p>
          <p className="text-sm text-text-muted max-w-xs mb-6">
            Thanks for reaching out. We'll get back to you within a day.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="grid sm:grid-cols-2 gap-8">
            <input
              name="firstName"
              type="text"
              required
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full bg-transparent border-b border-border-soft pb-3 text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors"
            />

            <input
              name="lastName"
              type="text"
              required
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full bg-transparent border-b border-border-soft pb-3 text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors"
            />
          </div>

          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full bg-transparent border-b border-border-soft pb-3 text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors"
          />

          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone/Mobile"
            className="w-full bg-transparent border-b border-border-soft pb-3 text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors"
          />

          <textarea
            name="message"
            required
            rows={2}
            value={form.message}
            onChange={handleChange}
            placeholder="Share Your Thoughts"
            className="w-full bg-transparent border-b border-border-soft pb-3 text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors resize-none"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border border-primary text-primary font-semibold text-sm py-4 rounded-full hover:bg-primary hover:text-black transition-colors"
          >
            Send Message
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default function ContactUs(): React.JSX.Element {
  return (
    <section id="contact" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Get in touch
            </h3>
            <p className="text-text-muted max-w-xl mx-auto">
              Our team would love to hear from you
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
