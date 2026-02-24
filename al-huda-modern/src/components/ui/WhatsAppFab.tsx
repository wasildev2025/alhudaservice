'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppFab({ phoneNumber, message }: { phoneNumber: string, message: string }) {
    // Strip non-numeric characters for the wa.me link
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 flex items-center justify-center cursor-pointer"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-6 h-6" />
        </a>
    );
}
