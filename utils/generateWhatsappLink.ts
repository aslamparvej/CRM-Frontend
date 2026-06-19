const generateWhatsappLink = (
  phone: string,
  message?: string,
): string => {
  const cleaned = phone.replace(/\D/g, "");
  const base = `https://wa.me/${cleaned}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export default generateWhatsappLink;