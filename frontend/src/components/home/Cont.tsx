"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { sendContactForm } from "@/utils/api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    companyName: "",
    projectDetails: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("=== FORM SUBMITTED ===");
    console.log("Form data:", formData);

    // Validate all required fields
    if (!formData.fullName || !formData.email || !formData.subject || !formData.projectDetails) {
      setMessage({
        type: "error",
        text: "Please fill all required fields (Full Name, Email, Subject, Project Details)",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await sendContactForm(formData);

      if (response.success) {
        setMessage({
          type: "success",
          text: response.message || "Message sent successfully! Check your email.",
        });
        // Clear form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          companyName: "",
          projectDetails: "",
        });
      } else {
        setMessage({
          type: "error",
          text: response.message || "Failed to send message. Please check the browser console for errors.",
        });
      }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: `Error: ${error.message || "Failed to connect to server"}. Check console for details.`,
      });
    } finally {
      setLoading(false);
    }
  };
 return (
    <section className="bg-white py-20 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto relative overflow-hidden">
        {/* Contact Badge */}
        <div className="mb-8">
          <span className="border border-gray-300 text-gray-800 text-[10px] md:text-[12px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full uppercase inline-block">
            Contact
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Side: Form Content */}
          <div className="flex-[1.5]">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Got ideas? We've got the <br /> skills. Let's team up.
            </h2>
            <p className="text-gray-600 text-lg mb-12 font-medium">
              Tell us more about yourself and what you're got in mind,
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {[
                { name: "fullName", placeholder: "Your full-name", type: "text" },
                { name: "email", placeholder: "yourcompany@mail.com", type: "email" },
                { name: "phone", placeholder: "Your phone number (optional)", type: "tel" },
                { name: "subject", placeholder: "Enter your subject", type: "text" },
                { name: "companyName", placeholder: "Your company name (optional)", type: "text" },
              ].map((field) => (
                <div key={field.name} className="border-b-[1.5px] border-gray-300 transition-colors focus-within:border-purple-500">
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 py-3 text-base md:text-lg"
                  />
                </div>
              ))}

              <div className="border-b-[1.5px] border-gray-300 transition-colors focus-within:border-purple-500">
                <textarea
                  name="projectDetails"
                  placeholder="Tell us a little about your project"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 py-3 text-base md:text-lg resize-none"
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#7c3aed] hover:bg-[#6d28d9] disabled:bg-gray-400 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-purple-500/20 active:scale-95 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Let's Get Started"}
                </button>
              </div>

              {/* Message Display */}
              {message && (
                <div className={`mt-4 p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}>
                  <p className="font-medium">{message.text}</p>
                </div>
              )}
            </form>
          </div>

          {/* Right Side: Support Card */}
          <div className="flex-1 lg:max-w-sm">
            <div className="bg-white rounded-3xl p-8 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] flex items-start gap-5 transition-transform hover:translate-y-[-5px]">
              {/* Icon Container */}
              <div className="bg-[#8b5cf6] p-3 rounded-2xl">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-xl tracking-tight">Chat to support</h3>
                <p className="text-gray-500 font-medium text-sm">We're here to help.</p>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href="https://wa.me/923001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8b5cf6] font-bold text-sm hover:underline flex items-center gap-2 group"
                  >
                    <FaWhatsapp className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href="mailto:support@yourdomain.com"
                    className="text-[#8b5cf6] font-bold text-sm hover:underline block"
                  >
                    support@yourdomain.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;