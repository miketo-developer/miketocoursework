// lib/whatsapp.ts
// Pon aquí tu número con lada, sin + ni espacios. Ej: México 52 + número
export const WHATSAPP_NUMBER = "5215542445352"; 

export const getWaLink = (text: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};