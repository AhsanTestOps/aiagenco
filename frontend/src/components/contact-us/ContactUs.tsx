// components/ContactUs.tsx
"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { sendContactForm } from "@/utils/api";

const ContactUs = () => {
  const { t } = useTranslation();
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

    // Validate all required fields
    if (!formData.fullName || !formData.email || !formData.subject || !formData.projectDetails) {
      console.error("❌ Missing required fields");
      setMessage({
        type: "error",
        text: "Please fill all required fields (Full Name, Email, Subject, Project Details)",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      console.log("📤 Sending to backend...");
      const response = await sendContactForm(formData);

      console.log("✅ Response received:", response);

      if (response.success) {
        console.log("✅ Success! Email sent");
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
        console.error("❌ API returned error:", response.message);
        setMessage({
          type: "error",
          text: response.message || "Failed to send message. Please check the browser console for errors.",
        });
      }
    } catch (error: any) {
      console.error("❌ Exception occurred:", error);
      setMessage({
        type: "error",
        text: `Error: ${error.message || "Failed to connect to server"}. Check console for details.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { name: "fullName", placeholder: t("contact_us.name_placeholder"), type: "text" },
    { name: "email", placeholder: t("contact_us.email_placeholder"), type: "email" },
    { name: "phone", placeholder: t("contact_us.phone_placeholder"), type: "tel" },
    { name: "subject", placeholder: t("contact_us.subject_placeholder"), type: "text" },
    { name: "companyName", placeholder: t("contact_us.company_placeholder"), type: "text" },
  ];

  return (
    <section className="bg-white py-20 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto bg-[#eef0f3] rounded-[40px] p-8 md:p-16 lg:p-20 relative overflow-hidden">
        {/* Contact Badge */}
        <div className="mb-8">
          <span className="border border-gray-300 text-gray-800 text-[10px] md:text-[12px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full uppercase inline-block">
            {t("contact_us.badge")}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Side: Form Content */}
          <div className="flex-[1.5]">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight"
              dangerouslySetInnerHTML={{ __html: t("contact_us.title") }}
            />
            <p className="text-gray-600 text-lg mb-12 font-medium">
              {t("contact_us.subtitle")}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {formFields.map((field) => (
                <div key={field.name} className="border-b-[1.5px] border-gray-300 transition-colors focus-within:border-purple-500">
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 py-3 text-base md:text-lg"
                    required={field.name === "fullName" || field.name === "email" || field.name === "subject"}
                    disabled={loading}
                  />
                </div>
              ))}

              <div className="border-b-[1.5px] border-gray-300 transition-colors focus-within:border-purple-500">
                <textarea
                  name="projectDetails"
                  placeholder={t("contact_us.project_placeholder")}
                  value={formData.projectDetails}
                  onChange={handleChange}
                  rows={2}
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 py-3 text-base md:text-lg resize-none disabled:opacity-50"
                  required
                  disabled={loading}
                />
              </div>

              {message && (
                <div className={`p-4 rounded-lg text-sm font-medium ${message.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
                  }`}>
                  {message.text}
                </div>
              )}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#7c3aed] hover:bg-[#6d28d9]"
                    } text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-purple-500/20 active:scale-95 disabled:active:scale-100`}
                >
                  {loading ? "Sending..." : t("contact_us.submit_btn")}
                </button>
              </div>
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
                <h3 className="font-bold text-gray-900 text-xl tracking-tight">{t("contact_us.support_title")}</h3>
                <p className="text-gray-500 font-medium text-sm">{t("contact_us.support_subtitle")}</p>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href="https://wa.me/923001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8b5cf6] font-bold text-sm hover:underline flex items-center gap-2 group"
                  >
                    <FaWhatsapp className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                    {t("contact_us.whatsapp_link")}
                  </a>
                  <a
                    href="mailto:ahsan@aiagenco.dev"
                    className="text-[#8b5cf6] font-bold text-sm hover:underline block"
                  >
                    ahsan@aiagenco.dev
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
