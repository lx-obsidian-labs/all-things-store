import type { Product } from "./types";

export interface SubcategoryDef {
  id: string;
  label: string;
}

export const subcategories: SubcategoryDef[] = [
  { id: "audio", label: "Audio" },
  { id: "charging", label: "Charging" },
  { id: "wearables", label: "Wearables" },
  { id: "phone-accessories", label: "Phone Accessories" },
  { id: "computer-accessories", label: "Computer Accessories" },
  { id: "tops", label: "Tops" },
  { id: "bottoms", label: "Bottoms" },
  { id: "outerwear", label: "Outerwear" },
  { id: "accessories", label: "Accessories" },
  { id: "jewelry-watches", label: "Jewelry & Watches" },
  { id: "footwear", label: "Footwear" },
  { id: "bags-wallets", label: "Bags & Wallets" },
  { id: "lighting", label: "Lighting" },
  { id: "home-decor", label: "Home Decor" },
  { id: "kitchen-dining", label: "Kitchen & Dining" },
  { id: "organization", label: "Organization" },
  { id: "fitness-exercise", label: "Fitness & Exercise" },
  { id: "personal-care", label: "Personal Care" },
  { id: "relaxation", label: "Relaxation" },
  { id: "electronics", label: "Electronics" },
  { id: "smart-home", label: "Smart Home" },
  { id: "tv-streaming", label: "TV & Streaming" },
  { id: "gaming", label: "Gaming" },
  { id: "car-interior", label: "Car Interior" },
  { id: "car-exterior", label: "Car Exterior" },
  { id: "car-tools", label: "Tools & Maintenance" },
  { id: "car-electronics", label: "Car Electronics" },
];

export function getSubcategoryLabel(id: string): string {
  return subcategories.find((s) => s.id === id)?.label ?? id;
}

const SUB_RULES: { sub: string; cat?: string; keywords: string[] }[] = [
  // Tech subcategories
  { sub: "audio", cat: "tech", keywords: ["earbud", "earphone", "headphone", "speaker", "ear clip", "bluetooth earbud", "tws", "wireless earbud", "airpod"] },
  { sub: "charging", cat: "tech", keywords: ["cable", "charger", "charging", "power bank", "usb-c", "usb c", "lightning", "charging stand", "charging dock", "wireless charger", "braided cable", "fast charging"] },
  { sub: "wearables", cat: "tech", keywords: ["smart watch", "smartwatch", "fitness tracker", "watch band", "amoled watch", "band replacement", "mt61"] },
  { sub: "phone-accessories", cat: "tech", keywords: ["phone case", "screen protector", "phone stand", "phone grip", "ring holder", "car phone", "phone holder", "tempered glass", "silicone case"] },
  { sub: "computer-accessories", cat: "tech", keywords: ["laptop stand", "laptop sleeve", "mouse pad", "gaming mouse", "webcam", "keyboard", "wrist rest", "laptop bag", "adjustable laptop"] },

  // Style / Clothing subcategories
  { sub: "tops", cat: "style", keywords: ["t-shirt", "tshirt", "t shirt", "shirt", "polo", "tank top", "hoodie", "sweater", "cardigan", "blouse", "sweatshirt", "pullover", "crop top", "vest", "cotton tee"] },
  { sub: "bottoms", cat: "style", keywords: ["short", "shorts", "pant", "pants", "legging", "leggings", "jean", "jeans", "trouser", "skirt", "jogger", "cargo"] },
  { sub: "outerwear", cat: "style", keywords: ["jacket", "coat", "beanie", "hat", "cap", "scarf", "glove", "gloves", "hooded", "bomber", "windbreaker", "rain", "puffer"] },
  { sub: "bags-wallets", cat: "style", keywords: ["wallet", "backpack", "handbag", "tote", "bag", "purse", "shoulder bag", "crossbody", "duffel", "luggage", "card holder", "metal wallet", "leather wallet", "card case"] },
  { sub: "accessories", cat: "style", keywords: ["belt", "sock", "socks", "tie", "sunglass", "glasses", "watch band", "leather bracelet", "woven bracelet", "bracelet"] },
  { sub: "jewelry-watches", cat: "style", keywords: ["watch", "necklace", "ring", "earring", "pendant", "bracelet", "chain", "gold", "silver", "mesh watch", "wooden watch", "leather bracelet"] },
  { sub: "footwear", cat: "style", keywords: ["shoe", "shoes", "sandal", "sneaker", "boot", "loafer", "trainer", "slipper", "canvas"] },

  // Home subcategories
  { sub: "lighting", cat: "home", keywords: ["lamp", "light", "led desk", "led lamp", "desk lamp", "lighting", "night light", "bulb", "smart lamp"] },
  { sub: "home-decor", cat: "home", keywords: ["clock", "planter", "pot", "vase", "wall clock", "modern clock", "ceramic pot", "flower pot", "ceramic planter", "frame", "decor", "decoration", "candle", "nordic", "shelf"] },
  { sub: "kitchen-dining", cat: "home", keywords: ["bottle", "thermal", "mug", "cup", "glass", "water bottle", "insulated", "kitchen", "container", "stainless steel", "smart bottle", "flask"] },
  { sub: "organization", cat: "home", keywords: ["organizer", "storage", "cable clip", "cable organizer", "desk organizer", "acrylic organizer", "shelf", "drawer", "magnetic clip", "cable management"] },

  // Wellness subcategories
  { sub: "fitness-exercise", cat: "wellness", keywords: ["yoga mat", "resistance band", "yoga block", "fitness", "exercise", "gym", "workout", "stretch", "pilates", "massage gun", "massage", "sport"] },
  { sub: "personal-care", cat: "wellness", keywords: ["blender", "portable blender", "bottle", "skincare", "makeup", "brush", "hair", "comb", "mirror", "shaver", "trimmer"] },
  { sub: "relaxation", cat: "wellness", keywords: ["diffuser", "aroma", "aromatherapy", "humidifier", "essential oil", "flame diffuser", "meditation", "candle", "relax"] },

  // Consumer Electronics subcategories
  { sub: "smart-home", cat: "consumer-electronics", keywords: ["smart home", "smart plug", "smart switch", "smart bulb", "home automation", "alexa", "google home", "hub", "motion sensor", "door sensor", "smart lock"] },
  { sub: "tv-streaming", cat: "consumer-electronics", keywords: ["tv", "television", "streaming", "firestick", "roku", "chromecast", "android tv", "smart tv", "projector", "hdmi", "tv box"] },
  { sub: "gaming", cat: "consumer-electronics", keywords: ["gaming", "controller", "headset", "keyboard", "mouse", "gaming chair", "rgb", "mechanical keyboard", "ps5", "xbox", "switch", "steam deck"] },

  // Car Parts subcategories
  { sub: "car-interior", cat: "car-parts", keywords: ["seat cover", "floor mat", "steering wheel", "car organizer", "phone mount", "sunshade", "cushion", "headrest", "trash can", "interior light", "ambient light"] },
  { sub: "car-exterior", cat: "car-parts", keywords: ["car cover", "wax", "polish", "brush", "snow brush", "ice scraper", "mud flap", "spoiler", "grille", "emblem", "license plate", "bumper", "mirror"] },
  { sub: "car-tools", cat: "car-parts", keywords: ["jack", "tire inflator", "jump starter", "multimeter", "obd2", "scanner", "tool kit", "wrench", "socket", "torque", "compressor", "pump"] },
  { sub: "car-electronics", cat: "car-parts", keywords: ["dash cam", "backup camera", "carplay", "android auto", "car stereo", "bluetooth adapter", "fm transmitter", "usb charger", "cigarette lighter", "voltage monitor"] },
];

export function assignSubcategory(product: Product): string {
  const text = (product.name + " " + (product.description || "") + " " + (product.supplier.sku || "")).toLowerCase();
  for (const rule of SUB_RULES) {
    if (rule.cat && rule.cat !== product.category) continue;
    for (const kw of rule.keywords) {
      if (text.includes(kw)) return rule.sub;
    }
  }
  return "electronics";
}

export function assignSubcategories(products: Product[]): Product[] {
  return products.map((p) => ({
    ...p,
    subcategory: p.subcategory ?? assignSubcategory(p),
  }));
}
