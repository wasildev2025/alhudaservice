import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
    try {
        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || "Al Huda <noreply@alhuda.com>",
            to: Array.isArray(to) ? to : [to],
            subject,
            html,
        });

        if (error) {
            console.error("Email send error:", error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error("Email service error:", err);
        return { success: false, error: err };
    }
}

export function bookingNotificationEmail(booking: {
    fullName: string;
    mobile: string;
    pickupLocation: string;
    dropLocation: string;
    date: string;
    time: string;
    passengers: number;
    vehicleType?: string | null;
}) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1B5E20, #2E7D32); padding: 20px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #FFD54F; margin: 0; font-size: 24px;">🚗 New Pick & Drop Booking</h1>
      </div>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Name</td><td style="padding: 8px;">${booking.fullName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Mobile</td><td style="padding: 8px;">${booking.mobile}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Pickup</td><td style="padding: 8px;">${booking.pickupLocation}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Drop</td><td style="padding: 8px;">${booking.dropLocation}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Date</td><td style="padding: 8px;">${booking.date}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Time</td><td style="padding: 8px;">${booking.time}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Passengers</td><td style="padding: 8px;">${booking.passengers}</td></tr>
          ${booking.vehicleType ? `<tr><td style="padding: 8px; font-weight: bold; color: #333;">Vehicle</td><td style="padding: 8px;">${booking.vehicleType}</td></tr>` : ""}
        </table>
      </div>
    </div>
  `;
}

export function packageInquiryEmail(inquiry: {
    fullName: string;
    mobile: string;
    packageName: string;
    date: string;
    persons: number;
    pickupLocation: string;
}) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1B5E20, #2E7D32); padding: 20px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #FFD54F; margin: 0; font-size: 24px;">🕌 New Ziyarat Inquiry</h1>
      </div>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${inquiry.fullName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Mobile</td><td style="padding: 8px;">${inquiry.mobile}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Package</td><td style="padding: 8px;">${inquiry.packageName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Date</td><td style="padding: 8px;">${inquiry.date}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Persons</td><td style="padding: 8px;">${inquiry.persons}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Pickup</td><td style="padding: 8px;">${inquiry.pickupLocation}</td></tr>
        </table>
      </div>
    </div>
  `;
}

export function khajoorInquiryEmail(inquiry: {
    fullName: string;
    mobile: string;
    requiredType: string;
    quantity: string;
    deliveryCity: string;
}) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #8B6914, #D4A843); padding: 20px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">🌴 New Khajoor Inquiry</h1>
      </div>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${inquiry.fullName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Mobile</td><td style="padding: 8px;">${inquiry.mobile}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Type</td><td style="padding: 8px;">${inquiry.requiredType}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Quantity</td><td style="padding: 8px;">${inquiry.quantity}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">City</td><td style="padding: 8px;">${inquiry.deliveryCity}</td></tr>
        </table>
      </div>
    </div>
  `;
}

export function contactMessageEmail(msg: {
    name: string;
    emailOrPhone: string;
    message: string;
}) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1565C0, #1976D2); padding: 20px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">📩 New Contact Message</h1>
      </div>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0;">
        <p><strong>Name:</strong> ${msg.name}</p>
        <p><strong>Contact:</strong> ${msg.emailOrPhone}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #eee;">${msg.message}</p>
      </div>
    </div>
  `;
}
