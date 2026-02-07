"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  category: string;
  date?: string;
  message: string;
  privacy: boolean;
}

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tCategories = useTranslations("categories");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-foreground mb-2">
          {t("success")}
        </h3>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          {t("name")} *
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          placeholder={t("namePlaceholder")}
          className={`w-full px-4 py-3 border rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
            errors.name ? "border-red-500" : "border-secondary"
          }`}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          {t("email")} *
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          placeholder={t("emailPlaceholder")}
          className={`w-full px-4 py-3 border rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
            errors.email ? "border-red-500" : "border-secondary"
          }`}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          {t("phone")}
        </label>
        <input
          type="tel"
          id="phone"
          {...register("phone")}
          placeholder={t("phonePlaceholder")}
          className="w-full px-4 py-3 border border-secondary rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
          {t("category")} *
        </label>
        <select
          id="category"
          {...register("category", { required: true })}
          className={`w-full px-4 py-3 border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
            errors.category ? "border-red-500" : "border-secondary"
          }`}
        >
          <option value="">{t("categoryPlaceholder")}</option>
          <option value="hochzeit">{tCategories("hochzeit")}</option>
          <option value="portrait">{tCategories("portrait")}</option>
          <option value="familie">{tCategories("familie")}</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
          {t("date")}
        </label>
        <input
          type="date"
          id="date"
          {...register("date")}
          className="w-full px-4 py-3 border border-secondary rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          {t("message")} *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message", { required: true })}
          placeholder={t("messagePlaceholder")}
          className={`w-full px-4 py-3 border rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none ${
            errors.message ? "border-red-500" : "border-secondary"
          }`}
        />
      </div>

      {/* Privacy */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          {...register("privacy", { required: true })}
          className="mt-1 w-4 h-4 text-primary border-secondary rounded focus:ring-primary/50"
        />
        <label
          htmlFor="privacy"
          className={`text-sm ${errors.privacy ? "text-red-500" : "text-muted-foreground"}`}
        >
          {t("privacy")} *
        </label>
      </div>

      {/* Error Message */}
      {status === "error" && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
          {t("error")}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full px-8 py-4 bg-primary text-white font-medium tracking-wider text-sm uppercase hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
