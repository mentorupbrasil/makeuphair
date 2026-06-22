export const BRAND = {
  name: "Bianca Brito",
  tagline: "Makeup & Hair",
  fullName: "Bianca Brito Makeup & Hair",
  description:
    "Maquiagem e penteados profissionais para noivas, eventos e produções completas em Imperatriz — MA.",
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
  colors: {
    cream: "#E6D7C8",
    taupe: "#C3B19B",
    taupeDark: "#7F654C",
    brown: "#663200",
    camel: "#CFA680",
    champagne: "#D2C0AB",
    bgDark: "#846C5B",
    black: "#1A1A1A",
    white: "#FFFFFF",
  },
  assets: {
    logoHorizontal: "/brand/logo-horizontal.png",
    logoHorizontalDark: "/brand/logo-horizontal-dark.png",
    logoPrimary: "/brand/logo-primary.png",
    logoLight: "/brand/logo-light.png",
    logoDark: "/brand/logo-dark.png",
    logoMetallic: "/brand/logo-metallic.png",
    monogram: "/brand/monogram.png",
    seal: "/brand/seal.png",
    sealDark: "/brand/seal-dark.png",
    pattern: "/brand/pattern.png",
  },
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${BRAND.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
