export const BRAND = {
  name: "Bianca Brito",
  tagline: "Makeup & Hair",
  fullName: "Bianca Brito Makeup & Hair",
  description:
    "Maquiagem e penteados de alta performance para noivas, editoriais e momentos que exigem perfeição.",
  contact: {
    instagram: "https://www.instagram.com/biancabrito.makeup/",
    instagramHandle: "@biancabrito.makeup",
    whatsapp: "5599981452008",
    whatsappDisplay: "(99) 98145-2008",
    phone: "(99) 98145-2008",
    address: "Rua Guarani, 556 — Vila Redenção II, Imperatriz — MA",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Guarani+556+Vila+Reden%C3%A7%C3%A3o+II+Imperatriz+MA",
  },
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${BRAND.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
