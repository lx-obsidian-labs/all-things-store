export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "minimalist-workspace-guide",
    title: "How to Build a Minimalist Workspace That Boosts Productivity",
    excerpt:
      "Discover how a clean, intentional desk setup can transform your focus and workflow.",
    content: `
      <p>The way you design your workspace directly affects how you think, create, and produce. A cluttered desk leads to a cluttered mind — and in the age of remote work, your desk is your command center.</p>

      <h2>Start with the essentials</h2>
      <p>A minimalist workspace isn't about having nothing. It's about having only what you need. Begin with three core pieces: a desk large enough for your workflow, an ergonomic chair, and proper lighting.</p>

      <h2>Invest in cable management</h2>
      <p>Nothing destroys a clean aesthetic faster than a tangle of cables. Use adhesive cable clips, a under-desk tray, or a cable sleeve to route everything neatly. Your future self will thank you every time you sit down.</p>

      <h2>Bring in one natural element</h2>
      <p>A single plant, a stone accent, or a wooden accessory breaks up the tech and adds warmth. Studies show that natural elements in a workspace reduce stress by up to 15%.</p>

      <h2>Choose tools that earn their place</h2>
      <p>Every item on your desk should serve a purpose. A wireless charging dock keeps your devices powered without cable swapping. A minimal desk lamp eliminates eye strain while looking sculptural. Choose tools that are both functional and beautiful.</p>

      <p>Remember: minimalism is not deprivation — it's intentionality. Curate your workspace the way you curate your life.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    category: "Lifestyle",
    author: "Alex Chen",
    date: "June 12, 2026",
    readTime: "4 min",
    featured: true,
  },
  {
    slug: "wireless-charging-explained",
    title: "Wireless Charging Explained: What to Look For in 2026",
    excerpt:
      "From wattage to compatibility — everything you need to know before buying a wireless charger.",
    content: `
      <p>Wireless charging has evolved from a novelty to a necessity. With Qi2 now mainstream and faster charging speeds than ever, 2026 is the year to cut the cord for good.</p>

      <h2>Understanding Qi2 and MagSafe</h2>
      <p>Qi2 is the new universal standard that uses Magnetic Power Profile (MPP) — essentially Apple's MagSafe technology opened up for the entire ecosystem. This means precise alignment and faster charging for both iPhones and Android devices.</p>

      <h2>Wattage matters</h2>
      <p>Look for at least 15W per device. A good 3-in-1 dock should deliver 15W to your phone, 5W to your earbuds, and 5W to your watch. Anything less and you'll be waiting longer than you'd like.</p>

      <h2>Heat management is key</h2>
      <p>Heat is the enemy of battery health. Premium chargers include intelligent heat management — look for terms like "temperature control," "cooling fan," or "heat dissipation design" in the product description.</p>

      <h2>Multi-device convenience</h2>
      <p>A 3-in-1 dock eliminates the need for multiple cables and adapters on your nightstand or desk. It's the single most impactful upgrade you can make for your daily charging routine.</p>

      <p>At All Things, our Obsidian Wireless Charging Dock meets all these criteria. It's the dock we designed for our own desks — and now for yours.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&q=80",
    category: "Tech",
    author: "Maya Torres",
    date: "June 8, 2026",
    readTime: "5 min",
    featured: true,
  },
  {
    slug: "everyday-wellness-routine",
    title: "5 Small Wellness Upgrades That Make a Big Difference",
    excerpt:
      "Simple, science-backed ways to improve your daily routine without overhauling your life.",
    content: `
      <p>Wellness doesn't have to mean hour-long meditation sessions or expensive gym memberships. Sometimes the smallest changes create the biggest impact.</p>

      <h2>1. Start your day with intentional hydration</h2>
      <p>Keep a smart water bottle on your nightstand and drink 500ml before coffee. Hydration first thing improves cognitive function, skin health, and energy levels throughout the day.</p>

      <h2>2. Create a tech-free wind-down ritual</h2>
      <p>30 minutes before bed, put your phone on its charger across the room. Use an aroma diffuser with lavender to signal your brain that it's time to rest. Your sleep quality will improve dramatically within a week.</p>

      <h2>3. Move for five minutes every hour</h2>
      <p>Sitting for prolonged periods is linked to a host of health issues. Set a timer to stand up, stretch, or walk for five minutes every hour. Your back and metabolism will thank you.</p>

      <h2>4. Eat from smaller plates</h2>
      <p>Portion control is one of the simplest dietary changes you can make. Using a smaller plate naturally reduces calorie intake without the feeling of deprivation.</p>

      <h2>5. Curate your air quality</h2>
      <p>The air you breathe affects your focus, sleep, and overall health. A simple ultrasonic diffuser with essential oils can improve air quality and create a calming environment wherever you are.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    category: "Wellness",
    author: "Dr. Sarah Kim",
    date: "June 4, 2026",
    readTime: "6 min",
    featured: true,
  },
  {
    slug: "choosing-vegan-leather-wallet",
    title: "Is Vegan Leather Right for You? A Practical Guide",
    excerpt:
      "What to know about modern vegan leather — durability, feel, and environmental impact.",
    content: `
      <p>Vegan leather has come a long way from the plasticky materials of the past. Today's premium vegan leathers are durable, sustainable, and surprisingly luxurious.</p>

      <h2>What is vegan leather?</h2>
      <p>Modern vegan leather is typically made from polyurethane (PU) coated on a fabric backing. Premium variants use bio-based materials like cactus, apple peel, or mushroom mycelium for a lower environmental footprint.</p>

      <h2>How does it compare to real leather?</h2>
      <p>High-quality vegan leather is resistant to cracking, easier to clean, and typically lighter than genuine leather. While it may not develop the same patina over time, it also doesn't require the conditioning and care that real leather demands.</p>

      <h2>What to look for</h2>
      <p>When choosing a vegan leather wallet, look for: RFID-blocking technology (essential for modern security), reinforced stitching at stress points, and a slim profile that won't bulge in your pocket. A good vegan leather wallet should last 2-4 years of daily use.</p>

      <p>Our Slim Leather Card Wallet checks all these boxes — hand-finished with premium vegan leather and designed for the modern carry.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    category: "Style",
    author: "Alex Chen",
    date: "May 28, 2026",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "portable-blender-recipes",
    title: "5 Smoothie Recipes for Your Portable Blender",
    excerpt:
      "Delicious, nutrient-packed smoothies you can make anywhere — from the gym to the office.",
    content: `
      <p>A portable blender changes the game for anyone with a busy lifestyle. Here are five recipes that take under two minutes each.</p>

      <h2>1. The Green Machine</h2>
      <p>1 cup spinach, 1 banana, 1/2 apple, 1 tbsp chia seeds, 1 cup oat milk. Blend until smooth. Packed with iron, fiber, and omega-3s.</p>

      <h2>2. Berry Protein Blast</h2>
      <p>1 scoop vanilla protein powder, 1/2 cup frozen mixed berries, 1 tbsp almond butter, 1 cup unsweetened almond milk. A post-workout powerhouse.</p>

      <h2>3. Tropical Morning</h2>
      <p>1/2 cup frozen mango, 1/2 cup frozen pineapple, 1/2 banana, 1/2 cup coconut water, 1/2 cup Greek yogurt. Tastes like vacation.</p>

      <h2>4. Chocolate Peanut Butter</h2>
      <p>1 scoop chocolate protein powder, 1 tbsp peanut butter, 1/2 banana, 1 cup oat milk. The classic that never disappoints.</p>

      <h2>5. Golden Turmeric</h2>
      <p>1 cup oat milk, 1/2 banana, 1/4 tsp turmeric, 1 pinch black pepper, 1 tsp honey, 1/2 tsp ginger. Anti-inflammatory and delicious.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b90d8?w=800&q=80",
    category: "Wellness",
    author: "Maya Torres",
    date: "May 22, 2026",
    readTime: "5 min",
    featured: false,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured);
}
