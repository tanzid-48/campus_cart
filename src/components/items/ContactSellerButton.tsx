"use client";

import { MessageCircle, Mail, Phone } from "lucide-react";

interface ContactSellerButtonProps {
  sellerName: string;
  sellerPhone?: string;
  sellerEmail?: string;
  itemTitle: string;
}

export default function ContactSellerButton({
  sellerName,
  sellerPhone,
  sellerEmail,
  itemTitle,
}: ContactSellerButtonProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi ${sellerName}, I'm interested in your "${itemTitle}" listing on CampusCart.`
  );

  return (
    <div className="flex flex-col gap-2">
      {sellerPhone && (
         <a
          href={`https://wa.me/${sellerPhone.replace(/\D/g, "")}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          <MessageCircle size={18} />
          Message on WhatsApp
        </a>
      )}

      {sellerPhone && (
          <a
          href={`tel:${sellerPhone}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Phone size={18} />
          Call Seller
        </a>
      )}

      {sellerEmail && (
          <a
          href={`mailto:${sellerEmail}?subject=${encodeURIComponent(`Regarding: ${itemTitle}`)}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Mail size={18} />
          Email Seller
        </a>
      )}
    </div>
  );
}