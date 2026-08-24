"use client";
import { getWaLink } from "@/lib/whatsapp";

interface Props {
  message: string;
  label?: string;
  className?: string;
}

export default function WhatsappButton({ message, label = "WhatsApp", className }: Props) {
  return (
    <a
      href={getWaLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className || "text-center py-3 rounded-xl bg-[#00BFFF] hover:bg-[#0099cc] text-white text-xs font-bold"}
    >
      {label}
    </a>
  );
}