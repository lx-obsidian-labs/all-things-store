import type { Product } from "./types";

export interface SubcategoryDef {
  id: string;
  label: string;
  parent?: string;
}

export const subcategories: SubcategoryDef[] = [
  // Electronics & Tech
  { id: "audio", label: "Audio & Headphones", parent: "tech" },
  { id: "charging", label: "Charging & Power", parent: "tech" },
  { id: "wearables", label: "Wearables & Smartwatches", parent: "tech" },
  { id: "phone-accessories", label: "Phone Cases & Screen Protection", parent: "tech" },
  { id: "computer-accessories", label: "Computer Accessories", parent: "tech" },
  { id: "cables-adapters", label: "Cables & Adapters", parent: "tech" },

  // Fashion & Apparel — Clothing
  { id: "tops", label: "Tops & Shirts", parent: "style" },
  { id: "bottoms", label: "Bottoms & Pants", parent: "style" },
  { id: "outerwear", label: "Jackets & Outerwear", parent: "style" },
  { id: "dresses", label: "Dresses & Skirts", parent: "style" },
  { id: "activewear", label: "Activewear & Sportswear", parent: "style" },

  // Fashion & Apparel — Accessories
  { id: "bags-wallets", label: "Bags, Wallets & Luggage", parent: "style" },
  { id: "belts-hats", label: "Belts, Hats & Scarves", parent: "style" },
  { id: "sunglasses", label: "Sunglasses & Eyewear", parent: "style" },
  { id: "socks-hosiery", label: "Socks & Hosiery", parent: "style" },

  // Fashion & Apparel — Jewelry & Watches
  { id: "jewelry-watches", label: "Jewelry & Watches", parent: "style" },
  { id: "necklaces-pendants", label: "Necklaces & Pendants", parent: "style" },
  { id: "rings-earrings", label: "Rings & Earrings", parent: "style" },
  { id: "bracelets-cuffs", label: "Bracelets & Cuffs", parent: "style" },

  // Shoes & Footwear
  { id: "sneakers", label: "Sneakers & Athletic", parent: "shoes" },
  { id: "boots", label: "Boots & Hiking", parent: "shoes" },
  { id: "sandals", label: "Sandals & Slides", parent: "shoes" },
  { id: "formal-shoes", label: "Formal & Dress Shoes", parent: "shoes" },
  { id: "loafers", label: "Loafers & Flats", parent: "shoes" },

  // Home & Living
  { id: "lighting", label: "Lighting & Lamps", parent: "home" },
  { id: "home-decor", label: "Home Decor & Accents", parent: "home" },
  { id: "kitchen-dining", label: "Kitchen & Dining", parent: "home" },
  { id: "organization", label: "Storage & Organization", parent: "home" },
  { id: "bed-bath", label: "Bedding & Bath", parent: "home" },
  { id: "furniture", label: "Furniture & Shelving", parent: "home" },

  // Health & Wellness
  { id: "fitness-exercise", label: "Fitness & Exercise", parent: "wellness" },
  { id: "personal-care", label: "Personal Care & Grooming", parent: "wellness" },
  { id: "relaxation", label: "Relaxation & Aromatherapy", parent: "wellness" },
  { id: "supplements", label: "Vitamins & Supplements", parent: "wellness" },
  { id: "massage-therapy", label: "Massage & Recovery", parent: "wellness" },

  // Automotive
  { id: "car-interior", label: "Interior Accessories", parent: "car-parts" },
  { id: "car-exterior", label: "Exterior Accessories", parent: "car-parts" },
  { id: "car-tools", label: "Tools & Maintenance", parent: "car-parts" },
  { id: "car-electronics", label: "Car Electronics & Gadgets", parent: "car-parts" },

  // Premium Electronics
  { id: "smart-home", label: "Smart Home & Automation", parent: "consumer-electronics" },
  { id: "tv-streaming", label: "TV & Streaming Devices", parent: "consumer-electronics" },
  { id: "gaming", label: "Gaming & VR", parent: "consumer-electronics" },
  { id: "cameras-photography", label: "Cameras & Photography", parent: "consumer-electronics" },

];

export function getSubcategoryLabel(id: string): string {
  return subcategories.find((s) => s.id === id)?.label ?? id;
}

export function getSubcategoriesForCategory(categoryId: string): SubcategoryDef[] {
  return subcategories.filter((s) => s.parent === categoryId);
}

const SUB_RULES: { sub: string; cat?: string; keywords: string[] }[] = [
  // Electronics & Tech subcategories
  { sub: "audio", cat: "tech", keywords: ["earbud", "earphone", "headphone", "speaker", "ear clip", "bluetooth earbud", "tws", "wireless earbud", "airpod", "headset"] },
  { sub: "cables-adapters", cat: "tech", keywords: ["cable", "adapter", "usb-c", "usb c", "lightning", "hdmi", "braided cable", "fast charging cable"] },
  { sub: "charging", cat: "tech", keywords: ["charger", "charging", "power bank", "charging stand", "charging dock", "wireless charger", "charging station", "magnetic charger"] },
  { sub: "wearables", cat: "tech", keywords: ["smart watch", "smartwatch", "fitness tracker", "watch band", "amoled watch", "band replacement", "mt61"] },
  { sub: "phone-accessories", cat: "tech", keywords: ["phone case", "screen protector", "phone stand", "phone grip", "ring holder", "car phone", "phone holder", "tempered glass", "silicone case", "phone film"] },
  { sub: "computer-accessories", cat: "tech", keywords: ["laptop stand", "laptop sleeve", "mouse pad", "gaming mouse", "webcam", "keyboard", "wrist rest", "laptop bag", "adjustable laptop"] },

  // Fashion & Apparel — Clothing subcategories
  { sub: "tops", cat: "style", keywords: ["t-shirt", "tshirt", "t shirt", "shirt", "polo", "tank top", "hoodie", "sweater", "cardigan", "blouse", "sweatshirt", "pullover", "crop top", "vest", "cotton tee"] },
  { sub: "bottoms", cat: "style", keywords: ["short", "shorts", "pant", "pants", "legging", "leggings", "jean", "jeans", "trouser", "skirt", "jogger", "cargo"] },
  { sub: "outerwear", cat: "style", keywords: ["jacket", "coat", "beanie", "hat", "cap", "scarf", "glove", "gloves", "hooded", "bomber", "windbreaker", "rain", "puffer"] },
  { sub: "dresses", cat: "style", keywords: ["dress", "skirt", "jumpsuit", "romper", "maxi dress", "midi dress", "mini dress", "sundress"] },
  { sub: "activewear", cat: "style", keywords: ["sport bra", "leggings", "yoga pants", "gym", "workout", "activewear", "training", "sportswear"] },

  // Fashion — Bags & Wallets
  { sub: "bags-wallets", cat: "style", keywords: ["wallet", "backpack", "handbag", "tote", "bag", "purse", "shoulder bag", "crossbody", "duffel", "luggage", "card holder", "metal wallet", "leather wallet", "card case"] },
  { sub: "belts-hats", cat: "style", keywords: ["belt", "hat", "cap", "beanie", "scarf", "headband"] },
  { sub: "sunglasses", cat: "style", keywords: ["sunglass", "glasses", "eyewear", "shades"] },
  { sub: "socks-hosiery", cat: "style", keywords: ["sock", "socks", "hosiery", "stockings", "tights"] },

  // Fashion — Jewelry & Watches
  { sub: "jewelry-watches", cat: "style", keywords: ["watch", "necklace", "ring", "earring", "pendant", "bracelet", "chain", "gold", "silver"] },
  { sub: "necklaces-pendants", cat: "style", keywords: ["necklace", "pendant", "chain", "choker", "locket"] },
  { sub: "rings-earrings", cat: "style", keywords: ["ring", "earring", "stud", "hoop", "band"] },
  { sub: "bracelets-cuffs", cat: "style", keywords: ["leather bracelet", "woven bracelet", "cuff", "bangle", "anklet"] },

  // Shoes & Footwear
  { sub: "sneakers", cat: "shoes", keywords: ["sneaker", "athletic shoe", "running shoe", "trainer", "canvas shoe"] },
  { sub: "boots", cat: "shoes", keywords: ["boot", "hiking boot", "work boot", "ankle boot", "combat boot"] },
  { sub: "sandals", cat: "shoes", keywords: ["sandal", "slide", "flip flop", "slip"] },
  { sub: "formal-shoes", cat: "shoes", keywords: ["formal shoe", "dress shoe", "oxford", "pump", "heel"] },
  { sub: "loafers", cat: "shoes", keywords: ["loafer", "flat", "moccasin", "boat shoe", "espadrille"] },

  // Home & Living subcategories
  { sub: "lighting", cat: "home", keywords: ["lamp", "light", "led desk", "led lamp", "desk lamp", "lighting", "night light", "bulb", "smart lamp"] },
  { sub: "home-decor", cat: "home", keywords: ["clock", "planter", "pot", "vase", "wall clock", "modern clock", "ceramic pot", "flower pot", "ceramic planter", "frame", "decor", "decoration", "candle", "nordic", "shelf"] },
  { sub: "kitchen-dining", cat: "home", keywords: ["bottle", "thermal", "mug", "cup", "glass", "water bottle", "insulated", "kitchen", "container", "stainless steel", "smart bottle", "flask", "knife", "pan", "pot", "utensil"] },
  { sub: "organization", cat: "home", keywords: ["organizer", "storage", "cable clip", "cable organizer", "desk organizer", "acrylic organizer", "shelf", "drawer", "magnetic clip", "cable management", "hanger"] },
  { sub: "bed-bath", cat: "home", keywords: ["pillow", "blanket", "towel", "sheet", "bedding", "comforter", "duvet", "bath mat"] },
  { sub: "furniture", cat: "home", keywords: ["shelf", "table", "chair", "desk", "cabinet", "rack", "stand", "stool"] },

  // Health & Wellness subcategories
  { sub: "fitness-exercise", cat: "wellness", keywords: ["yoga mat", "resistance band", "yoga block", "fitness", "exercise", "gym", "workout", "stretch", "pilates", "massage gun", "sport"] },
  { sub: "personal-care", cat: "wellness", keywords: ["skincare", "makeup", "brush", "hair", "comb", "mirror", "shaver", "trimmer"] },
  { sub: "relaxation", cat: "wellness", keywords: ["diffuser", "aroma", "aromatherapy", "humidifier", "essential oil", "flame diffuser", "meditation", "candle", "relax"] },
  { sub: "massage-therapy", cat: "wellness", keywords: ["massage gun", "massage", "percussion", "muscle", "recovery", "therapeutic"] },
  { sub: "supplements", cat: "wellness", keywords: ["vitamin", "supplement", "protein", "collagen", "probiotic", "wellness"] },

  // Automotive subcategories
  { sub: "car-interior", cat: "car-parts", keywords: ["seat cover", "floor mat", "steering wheel", "car organizer", "phone mount", "sunshade", "cushion", "headrest", "trash can", "interior light", "ambient light"] },
  { sub: "car-exterior", cat: "car-parts", keywords: ["car cover", "wax", "polish", "brush", "snow brush", "ice scraper", "mud flap", "spoiler", "grille", "emblem", "license plate", "bumper", "mirror"] },
  { sub: "car-tools", cat: "car-parts", keywords: ["jack", "tire inflator", "jump starter", "multimeter", "obd2", "scanner", "tool kit", "wrench", "socket", "torque", "compressor", "pump"] },
  { sub: "car-electronics", cat: "car-parts", keywords: ["dash cam", "backup camera", "carplay", "android auto", "car stereo", "bluetooth adapter", "fm transmitter", "usb charger", "cigarette lighter", "voltage monitor"] },

  // Premium Electronics subcategories
  { sub: "smart-home", cat: "consumer-electronics", keywords: ["smart home", "smart plug", "smart switch", "smart bulb", "home automation", "alexa", "google home", "hub", "motion sensor", "door sensor", "smart lock"] },
  { sub: "tv-streaming", cat: "consumer-electronics", keywords: ["tv", "television", "streaming", "firestick", "roku", "chromecast", "android tv", "smart tv", "projector", "hdmi", "tv box"] },
  { sub: "gaming", cat: "consumer-electronics", keywords: ["gaming", "controller", "headset", "keyboard", "mouse", "gaming chair", "rgb", "mechanical keyboard", "ps5", "xbox", "switch", "steam deck"] },
  { sub: "cameras-photography", cat: "consumer-electronics", keywords: ["camera", "photography", "lens", "tripod", "dslr", "mirrorless", "webcam", "gopro"] },
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
