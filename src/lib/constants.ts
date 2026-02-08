// Business Information - Use these constants throughout the site
export const BUSINESS_INFO = {
  name: 'SP Digital Studio & Color Lab',
  shortName: 'SP Digital Studio',
  tagline: 'Capturing Moments Since 1996',
  founder: 'Satpal Solanki',
  foundedYear: 1996,
  
  // Contact Information
  phones: ['+91 99106 43200', '+91 88003 59387'],
  phonesRaw: ['+919910643200', '+918800359387'],
  emails: ['satpalsolanki1636@gmail.com', 'bhaveshsolanki26112004@gmail.com'],
  
  // Address
  address: {
    street: 'RZ-10, Vijay Park, Naya Bazar',
    locality: 'Najafgarh',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110043',
    country: 'India',
    full: 'RZ-10, Vijay Park, Naya Bazar, Najafgarh, New Delhi - 110043, India',
  },
  
  // Social Media (placeholders - update when available)
  social: {
    whatsapp: 'https://wa.me/919910643200',
    instagram: '#',
    facebook: '#',
    youtube: '#',
  },
  
  // Business Hours
  hours: {
    weekdays: '9:00 AM - 9:00 PM',
    saturday: '9:00 AM - 9:00 PM',
    sunday: '10:00 AM - 6:00 PM',
  },
} as const

// Statistics for animated counters
export const STATS = {
  yearsInBusiness: new Date().getFullYear() - BUSINESS_INFO.foundedYear,
  eventsShot: 10000,
  albumsPrinted: 50000,
  happyClients: 8000,
} as const

// Service Categories
export const SERVICES = [
  {
    id: 'wedding',
    title: 'Wedding Photography',
    icon: 'Heart',
    shortDesc: 'Complete wedding coverage with premium packages',
    startingPrice: 25000,
  },
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding Shoots',
    icon: 'Camera',
    shortDesc: 'Beautiful couple portraits before the big day',
    startingPrice: 8000,
  },
  {
    id: 'destination-wedding',
    title: 'Destination Wedding',
    icon: 'Plane',
    shortDesc: 'Travel with us for your dream destination wedding',
    startingPrice: 75000,
  },
  {
    id: 'bridal',
    title: 'Bridal Shoot',
    icon: 'Sparkles',
    shortDesc: 'Stunning bridal portraits and lehenga shoots',
    startingPrice: 5000,
  },
  {
    id: 'birthday',
    title: 'Birthday Events',
    icon: 'Cake',
    shortDesc: 'Capture every celebration milestone',
    startingPrice: 5000,
  },
  {
    id: 'events',
    title: 'Corporate & Events',
    icon: 'Users',
    shortDesc: 'Professional coverage for all occasions',
    startingPrice: 8000,
  },
  {
    id: 'candid',
    title: 'Candid Photography',
    icon: 'Aperture',
    shortDesc: 'Natural, unposed moments captured beautifully',
    startingPrice: 10000,
  },
  {
    id: 'product',
    title: 'Product & Brand',
    icon: 'Package',
    shortDesc: 'E-commerce and catalog photography',
    startingPrice: 500,
  },
  {
    id: 'drone',
    title: 'Drone Shoots',
    icon: 'Plane',
    shortDesc: 'Aerial photography and videography',
    startingPrice: 5000,
  },
  {
    id: '360-booth',
    title: '360 Selfie Booth',
    icon: 'RotateCcw',
    shortDesc: 'Interactive booth for events and parties',
    startingPrice: 10000,
  },
] as const

// Equipment Rental Rates
export const EQUIPMENT_RENTALS = [
  {
    id: 'drone',
    name: 'Professional Drone',
    description: 'With professional operator',
    dailyRate: 12000,
    image: '/images/equipment/drone.jpg',
  },
  {
    id: 'led-double',
    name: '2x LED Screens (52")',
    description: 'Perfect for events and weddings',
    dailyRate: 8000,
    image: '/images/equipment/led.jpg',
  },
  {
    id: 'led-single',
    name: 'Single LED Screen (52")',
    description: 'Great for smaller events',
    dailyRate: 5000,
    image: '/images/equipment/led-single.jpg',
  },
  {
    id: 'plasma',
    name: 'Plasma Screen (8x12 ft)',
    description: 'Large display for grand events',
    dailyRate: 15000,
    image: '/images/equipment/plasma.jpg',
  },
  {
    id: '360-booth',
    name: '360 Selfie Booth',
    description: 'Interactive photo booth with instant prints',
    dailyRate: 10000,
    image: '/images/equipment/360-booth.jpg',
  },
] as const

// Wedding Packages
export const WEDDING_PACKAGES = [
  {
    id: 'basic',
    name: 'Basic Package',
    description: 'Perfect for single-day small programs',
    price: { min: 25000, max: 30000 },
    includes: [
      '1 Professional Photographer',
      '1 Professional Videographer',
      'Full Photo Editing',
      'Video Mixing (2 Songs)',
      '25 Sheet Premium Album',
      'Album Cover Design',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Package',
    description: 'Complete coverage with added features',
    price: { min: 40000, max: 50000 },
    includes: [
      'Everything in Basic',
      '2x LED Screens (52")',
      'Video Mixing (2-3 Songs)',
      'Cinematic Teaser',
      'Drone Coverage',
      'Same Day Edit',
    ],
    popular: true,
  },
  {
    id: 'destination',
    name: 'Destination Wedding',
    description: 'Travel with us anywhere in India',
    price: { min: 75000, max: 150000 },
    includes: [
      'Full Team Travel',
      'Multi-Day Coverage',
      'All Premium Features',
      'Pre-Wedding Shoot',
      'Custom Equipment Setup',
      'Dedicated Project Manager',
    ],
    perDay: true,
  },
] as const

// Photo Print Sizes and Pricing
export const PHOTO_PRINTS = [
  { size: '4x6 inches', price: 15 },
  { size: '5x7 inches', price: 60 },
  { size: '6x8 inches', price: 70 },
  { size: '8x10 inches', price: 180 },
  { size: '8x12 inches', price: 220 },
  { size: '10x12 inches', price: 300 },
  { size: '12x18 inches', price: 380 },
] as const

// Bulk Discount Tiers
export const PRINT_BULK_DISCOUNTS = [
  { minQty: 10, discount: 10, label: '10+ photos: 10% off' },
  { minQty: 25, discount: 15, label: '25+ photos: 15% off' },
  { minQty: 50, discount: 20, label: '50+ photos: 20% off' },
  { minQty: 100, discount: 25, label: '100+ photos: 25% off' },
] as const

// Passport & ID Photo Pricing
export const PASSPORT_PHOTOS = [
  { type: 'Passport Size (Indian)', size: '35mm x 45mm', price: 100, quantity: 8 },
  { type: 'Passport Size (US/UK)', size: '51mm x 51mm', price: 200, quantity: 8 },
  { type: 'Visa Size (Schengen)', size: '35mm x 45mm', price: 150, quantity: 8 },
  { type: 'OCI/PIO Card', size: '51mm x 51mm', price: 220, quantity: 8 },
  { type: 'Aadhar Card', size: '35mm x 45mm', price: 90, quantity: 8 },
  { type: 'PAN Card', size: '25mm x 35mm', price: 100, quantity: 8 },
  { type: 'Driving License', size: '35mm x 45mm', price: 100, quantity: 8 },
  { type: 'College/School ID', size: 'Standard', price: 100, quantity: 8 },
] as const

// Product Categories for Shop
export const PRODUCT_CATEGORIES = [
  { id: 'prints', name: 'Photo Prints', icon: 'Image' },
  { id: 'frames', name: 'Frames', icon: 'Frame' },
  { id: 'albums', name: 'Photo Albums', icon: 'Book' },
  { id: 'merchandise', name: 'Merchandise', icon: 'Gift' },
  { id: 'accessories', name: 'Accessories', icon: 'HardDrive' },
] as const

// Navigation Links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/testimonials', label: 'Reviews' },
  { href: '/products', label: 'Shop' },
  { href: '/booking', label: 'Book Now' },
  { href: '/contact', label: 'Contact' },
] as const

// Footer Links
export const FOOTER_LINKS = {
  services: [
    { href: '/services#wedding', label: 'Wedding Photography' },
    { href: '/services#pre-wedding', label: 'Pre-Wedding Shoots' },
    { href: '/services#product', label: 'Product Photography' },
    { href: '/services#editing', label: 'Photo & Video Editing' },
    { href: '/restoration', label: 'Photo Restoration' },
  ],
  quickLinks: [
    { href: '/booking', label: 'Book a Shoot' },
    { href: '/equipment-rental', label: 'Equipment Rental' },
    { href: '/instant-services', label: 'Instant Prints' },
    { href: '/album-design', label: 'Album Design' },
    { href: '/blog', label: 'Tips & Blog' },
  ],
} as const

// SEO Metadata
export const SEO = {
  title: 'SP Digital Studio & Color Lab — Photography & Video, Najafgarh, New Delhi',
  description: 'SP Digital Studio & Color Lab — Professional photography & videography since 1996. Weddings, events, product shoots, instant prints, photo restoration & more. Call +91 99106 43200.',
  keywords: 'photography studio najafgarh, wedding photographer delhi, photo studio new delhi, video editing, photo restoration, instant prints, passport photos, pre-wedding shoot',
  ogImage: '/images/og-image.jpg',
} as const
