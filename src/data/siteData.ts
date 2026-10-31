// ============================================================
// Lé Café Crush — Site Data & Menu
// All business details in one place for easy editing
// ============================================================

export const SITE = {
  name: 'Lé Café Crush',
  descriptor: 'Restaurant & Lounge',
  tagline: 'More than food, we serve memories.',
  city: 'Patna',
  timeZone: 'Asia/Kolkata',
  hours: { open: '10:30', close: '23:00', days: 'Every day' },
  address: '2nd Floor, Matwar Market, Raja Bazar, Pillar No. 37, above Union Bank, Patna-14',
  pincode: '800014',
  phone: '+91 8434312046',
  whatsapp: '+91 8434312046',
  email: 'lecafecrush@gmail.com',
  instagram: 'https://instagram.com/le_cafecrush',
  instagramHandle: '@le.cafe crush',
  orderUrl: '#',
  platforms: {
    zomato: '#',
    swiggy: '#',
  },
  delivery: {
    area: 'Ashiana More, Khajpura & nearby',
    time: '30–45 mins',
    minOrder: 300,
  },
  fssai: 'FSSAI Lic. No. XXXXXXXXXX',
  founded: 2020,
  stats: {
    deliveryTime: '30–45',
    kitchens: 8,
    partiesHosted: '850+',
    happyGuests: '15k+',
  },
} as const;

export const OFFERS = [
  { code: 'CRUSH15', label: '15% off direct delivery orders', type: 'delivery' as const },
  { code: 'COUPLE599', label: '₹599 candlelight couple feast', type: 'dine-in' as const },
  { code: 'SQUADFEAST', label: 'Save ₹350 on the weekend friends platter', type: 'dine-in' as const },
  { code: 'SWEETTREAT', label: 'Free lava cake above ₹499', type: 'delivery' as const },
] as const;

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  veg: boolean;
  description?: string;
  popular?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  hi: string;
  items: MenuItem[];
}

export const MENU: MenuCategory[] = [
  {
    id: 'tandoori',
    name: 'Tandoori',
    hi: 'तंदूरी',
    items: [
      { id: 'paneer-tikka', name: 'Paneer Tikka', price: 299, veg: true, description: 'Charred cottage cheese with bell peppers and onion', popular: true },
      { id: 'malai-chaap', name: 'Malai Chaap', price: 279, veg: true, description: 'Creamy marinated soy chaap, grilled to perfection' },
      { id: 'chicken-tandoori', name: 'Chicken Tandoori', price: 349, veg: false, description: 'Whole tandoori chicken, smoky and spiced', popular: true },
      { id: 'seekh-kebab', name: 'Seekh Kebab', price: 319, veg: false, description: 'Minced mutton skewers with aromatic spices' },
    ],
  },
  {
    id: 'indian-veg',
    name: 'Indian Veg',
    hi: 'शाकाहारी',
    items: [
      { id: 'paneer-butter-masala', name: 'Paneer Butter Masala', price: 279, veg: true, description: 'Rich tomato-cream curry with soft paneer' },
      { id: 'dal-makhani', name: 'Dal Makhani', price: 249, veg: true, description: 'Slow-cooked black lentils in butter and cream' },
      { id: 'shahi-paneer', name: 'Shahi Paneer', price: 289, veg: true, description: 'Royal paneer in a creamy cashew gravy' },
      { id: 'mix-veg', name: 'Mix Veg Curry', price: 229, veg: true, description: 'Seasonal vegetables in a spiced gravy' },
    ],
  },
  {
    id: 'indian-nv',
    name: 'Indian Non-Veg',
    hi: 'मांसाहारी',
    items: [
      { id: 'butter-chicken', name: 'Butter Chicken', price: 349, veg: false, description: 'Tender chicken in a velvety tomato-butter gravy', popular: true },
      { id: 'chicken-curry', name: 'Chicken Curry', price: 299, veg: false, description: 'Home-style chicken curry with warm spices' },
      { id: 'mutton-rogan-josh', name: 'Mutton Rogan Josh', price: 399, veg: false, description: 'Kashmiri-style mutton in aromatic red gravy' },
      { id: 'egg-curry', name: 'Egg Curry', price: 199, veg: false, description: 'Boiled eggs in a spiced onion-tomato gravy' },
    ],
  },
  {
    id: 'chinese',
    name: 'Chinese',
    hi: 'चाइनीज़',
    items: [
      { id: 'veg-fried-rice', name: 'Veg Fried Rice', price: 229, veg: true, description: 'Wok-tossed rice with fresh vegetables', popular: true },
      { id: 'chicken-chowmein', name: 'Chicken Chowmein', price: 259, veg: false, description: 'Stir-fried noodles with chicken and vegetables' },
      { id: 'manchurian', name: 'Veg Manchurian', price: 219, veg: true, description: 'Crispy vegetable dumplings in tangy sauce' },
      { id: 'chilli-chicken', name: 'Chilli Chicken', price: 279, veg: false, description: 'Spicy Indo-Chinese chicken with peppers' },
    ],
  },
  {
    id: 'mocktails',
    name: 'Mocktails',
    hi: 'मॉकटेल',
    items: [
      { id: 'berry-mocktail', name: 'House Berry Crush', price: 179, veg: true, description: 'Layered berry mocktail with mint and lime', popular: true },
      { id: 'virgin-mojito', name: 'Virgin Mojito', price: 149, veg: true, description: 'Classic lime and mint refresher' },
      { id: 'blue-lagoon', name: 'Blue Lagoon', price: 169, veg: true, description: 'Tropical blue curaçao with lemonade' },
      { id: 'mango-tango', name: 'Mango Tango', price: 159, veg: true, description: 'Fresh mango pulp blended with ice' },
    ],
  },
  {
    id: 'shakes',
    name: 'Shakes & Beverages',
    hi: 'पेय',
    items: [
      { id: 'chocolate-shake', name: 'Chocolate Shake', price: 179, veg: true, description: 'Rich chocolate milkshake with whipped cream' },
      { id: 'cold-coffee', name: 'Cold Coffee', price: 149, veg: true, description: 'Creamy iced coffee with a frothy top' },
      { id: 'oreo-shake', name: 'Oreo Shake', price: 189, veg: true, description: 'Blended Oreo cookie milkshake' },
      { id: 'masala-chai', name: 'Masala Chai', price: 49, veg: true, description: 'Spiced Indian tea, brewed fresh' },
    ],
  },
  {
    id: 'rice',
    name: 'Rice & Biryani',
    hi: 'बिरयानी',
    items: [
      { id: 'chicken-biryani', name: 'Chicken Biryani', price: 329, veg: false, description: 'Layered handi biryani with saffron and fried onions', popular: true },
      { id: 'veg-biryani', name: 'Veg Biryani', price: 249, veg: true, description: 'Fragrant vegetable biryani with raita' },
      { id: 'mutton-biryani', name: 'Mutton Biryani', price: 399, veg: false, description: 'Slow-cooked mutton biryani, Lucknowi style' },
      { id: 'jeera-rice', name: 'Jeera Rice', price: 149, veg: true, description: 'Cumin-tempered basmati rice' },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    hi: 'मीठा',
    items: [
      { id: 'chocolate-brownie', name: 'Chocolate Brownie', price: 249, veg: true, description: 'Warm brownie with ice cream and hot fudge', popular: true },
      { id: 'gulab-jamun', name: 'Gulab Jamun', price: 129, veg: true, description: 'Soft milk dumplings in rose-cardamom syrup' },
      { id: 'lava-cake', name: 'Lava Cake', price: 279, veg: true, description: 'Molten chocolate cake with vanilla ice cream' },
      { id: 'rasmalai', name: 'Rasmalai', price: 149, veg: true, description: 'Chilled cottage cheese dumplings in saffron milk' },
    ],
  },
  {
    id: 'continental',
    name: 'Continental',
    hi: 'कॉन्टिनेंटल',
    items: [
      { id: 'white-sauce-pasta', name: 'White Sauce Pasta', price: 279, veg: true, description: 'Creamy penne in garlic white sauce', popular: true },
      { id: 'red-sauce-pasta', name: 'Red Sauce Pasta', price: 259, veg: true, description: 'Penne arrabbiata with fresh basil' },
      { id: 'garlic-bread', name: 'Garlic Bread', price: 149, veg: true, description: 'Toasted bread with garlic butter and herbs' },
      { id: 'veg-burger', name: 'Veg Burger', price: 179, veg: true, description: 'Crispy patty with lettuce, cheese and sauces' },
    ],
  },
];

// The eight hero dishes — ordered for the scroll-scrubbed hero
export interface HeroDish {
  id: string;
  name: string;
  giantWord: string;
  category: string;
  accent: string;
  price: string;
  description: string;
  ingredients: string;
}

export const HERO_DISHES: HeroDish[] = [
  {
    id: 'paneer-tikka',
    name: 'Paneer Tikka',
    giantWord: 'Tikka',
    category: 'Tandoori',
    accent: '#ec7f35',
    price: '₹299',
    description: 'Charred paneer skewers kissed by charcoal flame, with bell pepper and red onion.',
    ingredients: 'paneer cubes, bell pepper, onion rings, mint chutney, spices',
  },
  {
    id: 'white-sauce-pasta',
    name: 'White Sauce Pasta',
    giantWord: 'Pasta',
    category: 'Continental',
    accent: '#fbdd2f',
    price: '₹279',
    description: 'Creamy penne in a garlicky white sauce, with a side of toasted garlic bread.',
    ingredients: 'penne, parmesan, herbs, garlic, cream swirls',
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    giantWord: 'Makhani',
    category: 'Indian Non-Veg',
    accent: '#ff5a47',
    price: '₹349',
    description: 'Tender chicken pieces swimming in a velvety tomato-butter gravy with a cream swirl.',
    ingredients: 'chicken pieces, tomatoes, butter, cream, kasuri methi',
  },
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    giantWord: 'Biryani',
    category: 'Rice & Biryani',
    accent: '#ddb474',
    price: '₹329',
    description: 'Layered handi biryani, fragrant with saffron and topped with crispy fried onions.',
    ingredients: 'rice, chicken, saffron, fried onions, mint',
  },
  {
    id: 'chicken-tandoori',
    name: 'Chicken Tandoori',
    giantWord: 'Tandoori',
    category: 'Tandoori',
    accent: '#ff8a3d',
    price: '₹349',
    description: 'Whole tandoori chicken on slate, smoky and fiery red, with lemon and onion rings.',
    ingredients: 'chicken pieces, red chillies, lemon, onion, smoke',
  },
  {
    id: 'veg-fried-rice',
    name: 'Veg Fried Rice',
    giantWord: 'Wok',
    category: 'Chinese',
    accent: '#9fc54d',
    price: '₹229',
    description: 'High-flame wok-tossed rice with garden vegetables and a hint of soy.',
    ingredients: 'rice grains, carrot, beans, spring onion, sauces',
  },
  {
    id: 'berry-mocktail',
    name: 'House Berry Crush',
    giantWord: 'Crush',
    category: 'Mocktails',
    accent: '#c95a4f',
    price: '₹179',
    description: 'A layered berry mocktail with fresh mint, lime wheels and sparkling bubbles.',
    ingredients: 'berries, lime wheels, mint, ice, bubbles',
  },
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    giantWord: 'Brownie',
    category: 'Desserts',
    accent: '#d9a066',
    price: '₹249',
    description: 'A warm, fudgy brownie crowned with vanilla ice cream and drizzled with hot fudge.',
    ingredients: 'brownie chunks, ice cream scoops, chocolate shards, nuts',
  },
];

// House rules for the quote carousel
export const HOUSE_RULES = [
  'Birthdays get balloons. Everyone gets a smile.',
  'The last brownie is a negotiation.',
  'Photos first. Then forks.',
  'Leftovers are a compliment. Containers are on the house.',
];

// Five steps journey
export const FIVE_STEPS = [
  { num: '01', en: 'Arrive', hi: 'स्वागत', description: 'Walk into warmth, fairy lights, and the smell of something incredible.' },
  { num: '02', en: 'Settle', hi: 'आराम', description: 'Pick your spot — a candlelit cabin, a garden table, or the big hall for the whole crew.' },
  { num: '03', en: 'Taste', hi: 'स्वाद', description: 'Eight kitchens, one roof. From tandoor to wok, every bite is a conversation starter.' },
  { num: '04', en: 'Celebrate', hi: 'जश्न', description: 'Balloons go up, cameras come out, and the brownie arrives with a sparkler.' },
  { num: '05', en: 'Remember', hi: 'यादें', description: 'You came for food. You left with a memory. That\'s the Café Crush promise.' },
];

// Marquee words
export const MARQUEE_WORDS = [
  'Birthdays', 'Candlelight Cabins', 'Fairy Lights', 'Family Feasts',
  'मस्ती', 'यादें', 'दावत', 'Date Nights', 'Celebrations',
  'Live Music', 'Rooftop Vibes', 'Weekend Brunches', 'जश्न',
];

// Helper: get current open/closed status
export function getCafeStatus(): { isOpen: boolean; label: string } {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: SITE.timeZone }));
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  const [openH, openM] = SITE.hours.open.split(':').map(Number);
  const [closeH, closeM] = SITE.hours.close.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  if (isOpen) {
    const remaining = closeMinutes - currentMinutes;
    if (remaining <= 60) {
      return { isOpen: true, label: `Open · closes in ${remaining}m` };
    }
    return { isOpen: true, label: 'Open now' };
  }

  return { isOpen: false, label: `Closed · opens ${SITE.hours.open}` };
}
