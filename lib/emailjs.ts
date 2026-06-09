import emailjs from "@emailjs/browser";

// ─── Replace these three values with your EmailJS credentials ────────────────
export const EMAILJS_SERVICE_ID  = "service_53cimsa";
export const EMAILJS_TEMPLATE_ID = "template_cwcoh7v";
export const EMAILJS_PUBLIC_KEY  = "P_5xsyhYAYONyIXmq";
// ─────────────────────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  businessType: string;
  bestTime: string;
  date1: string;
  date2: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      to_name:          data.name,
      to_email:         data.email,
      phone:            data.phone,
      business_type:    data.businessType,
      best_time:        data.bestTime,
      preferred_date_1: data.date1,
      preferred_date_2: data.date2,
    },
    EMAILJS_PUBLIC_KEY
  );
}
