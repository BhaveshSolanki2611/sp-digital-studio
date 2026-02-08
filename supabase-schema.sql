-- SP Digital Studio & Color Lab - Supabase Database Schema
-- Run this SQL in Supabase SQL Editor (https://supabase.com/dashboard/project/kqdogstazxjrmweyanrf/sql)

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BOOKINGS TABLE (Photography/Video Services)
-- =====================================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_end_date DATE,
  location TEXT,
  package_type TEXT,
  budget TEXT,
  notes TEXT,
  files TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'partial', 'paid')),
  total_amount DECIMAL(10,2),
  paid_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ORDERS TABLE (Shop Products)
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT,
  pickup_option BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('razorpay', 'paypal', 'upi', 'cod')),
  payment_id TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  subtotal DECIMAL(10,2) NOT NULL,
  shipping DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ORDER ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  options JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  images TEXT[] DEFAULT '{}',
  options JSONB,
  in_stock BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- EQUIPMENT TABLE (Rental Items)
-- =====================================================
CREATE TABLE IF NOT EXISTS equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  daily_rate DECIMAL(10,2) NOT NULL,
  hourly_rate DECIMAL(10,2),
  images TEXT[] DEFAULT '{}',
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- EQUIPMENT BOOKINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS equipment_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  equipment_id UUID NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INQUIRIES TABLE (Contact Form)
-- =====================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  source TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- RESTORATION REQUESTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS restoration_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  file_url TEXT NOT NULL,
  description TEXT,
  service_type TEXT DEFAULT 'restoration' CHECK (service_type IN ('restoration', 'colorization', 'both')),
  estimated_price DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'approved', 'in_progress', 'completed', 'cancelled')),
  result_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  service TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  photo_url TEXT,
  event_date DATE,
  approved BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR BETTER PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON bookings(event_date);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

CREATE INDEX IF NOT EXISTS idx_equipment_available ON equipment(available);

CREATE INDEX IF NOT EXISTS idx_equipment_bookings_dates ON equipment_bookings(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_equipment_bookings_status ON equipment_bookings(status);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);

CREATE INDEX IF NOT EXISTS idx_restoration_status ON restoration_requests(status);

CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);

-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at column
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_equipment_updated_at ON equipment;
CREATE TRIGGER update_equipment_updated_at
  BEFORE UPDATE ON equipment
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_equipment_bookings_updated_at ON equipment_bookings;
CREATE TRIGGER update_equipment_bookings_updated_at
  BEFORE UPDATE ON equipment_bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_restoration_requests_updated_at ON restoration_requests;
CREATE TRIGGER update_restoration_requests_updated_at
  BEFORE UPDATE ON restoration_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE restoration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Products: Anyone can read
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Products: Only service role can insert/update/delete
CREATE POLICY "Products are editable by service role" ON products
  FOR ALL USING (auth.role() = 'service_role');

-- Equipment: Anyone can read
CREATE POLICY "Equipment is viewable by everyone" ON equipment
  FOR SELECT USING (true);

-- Testimonials: Anyone can read approved testimonials
CREATE POLICY "Approved testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (approved = true);

-- Testimonials: Anyone can insert (for review submissions)
CREATE POLICY "Anyone can submit testimonials" ON testimonials
  FOR INSERT WITH CHECK (true);

-- Bookings: Insert allowed for anyone (form submissions)
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- Orders: Insert allowed for anyone (checkout)
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Order Items: Insert allowed for anyone
CREATE POLICY "Anyone can create order items" ON order_items
  FOR INSERT WITH CHECK (true);

-- Inquiries: Anyone can insert
CREATE POLICY "Anyone can submit inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- Restoration Requests: Anyone can insert
CREATE POLICY "Anyone can submit restoration requests" ON restoration_requests
  FOR INSERT WITH CHECK (true);

-- Equipment Bookings: Anyone can insert
CREATE POLICY "Anyone can book equipment" ON equipment_bookings
  FOR INSERT WITH CHECK (true);

-- Newsletter: Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- SAMPLE DATA - EQUIPMENT
-- =====================================================
INSERT INTO equipment (name, description, daily_rate, hourly_rate, images, available) VALUES
  ('DJI Mavic 3 Pro Drone', 'Professional 4K drone with Hasselblad camera, includes certified operator', 12000, NULL, '{}', true),
  ('LED Screen 52"', '52-inch LED display screen for events, includes stand and setup', 5000, NULL, '{}', true),
  ('LED Screen Pair 52"', 'Two 52-inch LED display screens for events, includes stands and setup', 8000, NULL, '{}', true),
  ('Plasma Screen 8x12 ft', 'Large 8x12 feet plasma screen for weddings and corporate events', 15000, NULL, '{}', true),
  ('360 Selfie Booth', 'Interactive 360-degree video booth with instant sharing', 10000, NULL, '{}', true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SAMPLE DATA - PRODUCTS
-- =====================================================
INSERT INTO products (name, slug, category, description, price, compare_price, images, in_stock, featured) VALUES
  ('Passport Photo Set (8 Photos)', 'passport-photo-set', 'passport-photos', 'Standard passport size photos, set of 8. Printed on high-quality photo paper.', 50, NULL, '{}', true, true),
  ('Photo Frame 8x10', 'photo-frame-8x10', 'frames', 'Classic wooden photo frame, 8x10 inches', 350, 450, '{}', true, false),
  ('Photo Frame 12x18', 'photo-frame-12x18', 'frames', 'Premium wooden photo frame, 12x18 inches', 650, 800, '{}', true, false),
  ('Photo Album 25 Sheets', 'photo-album-25-sheets', 'albums', 'Wedding album with 25 premium sheets and customizable cover', 3500, 4500, '{}', true, true),
  ('Photo Album 40 Sheets', 'photo-album-40-sheets', 'albums', 'Deluxe wedding album with 40 premium sheets and leather cover', 6500, 8000, '{}', true, false),
  ('Canvas Print 16x20', 'canvas-print-16x20', 'prints', 'Gallery-wrapped canvas print, 16x20 inches', 1800, 2200, '{}', true, true),
  ('Canvas Print 24x36', 'canvas-print-24x36', 'prints', 'Large gallery-wrapped canvas print, 24x36 inches', 3500, 4200, '{}', true, false),
  ('Photo Keychain', 'photo-keychain', 'gifts', 'Custom photo keychain with your favorite image', 150, NULL, '{}', true, false),
  ('Photo Mug', 'photo-mug', 'gifts', 'Ceramic mug with custom photo printing', 350, NULL, '{}', true, true),
  ('Photo Calendar', 'photo-calendar', 'gifts', '12-month calendar with your photos', 500, 650, '{}', true, false)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- SAMPLE DATA - TESTIMONIALS
-- =====================================================
INSERT INTO testimonials (name, service, rating, text, event_date, approved, featured) VALUES
  ('Priya & Rahul Sharma', 'Wedding Photography', 5, 'SP Digital Studio captured our wedding beautifully! The team was professional, punctual, and creative. Our album is absolutely stunning. Highly recommend for anyone looking for quality wedding photography.', '2024-11-15', true, true),
  ('Amit Verma', 'Pre-Wedding Shoot', 5, 'Amazing pre-wedding shoot experience! Satpal ji and team knew exactly how to make us comfortable and the photos came out gorgeous. Great value for money.', '2024-10-20', true, true),
  ('Sunita Devi', 'Photo Restoration', 5, 'They restored my parents'' 50-year-old wedding photo perfectly. I was amazed at the quality. It was like magic seeing the old photo come back to life.', '2024-09-10', true, true),
  ('Rajesh Kumar', 'Birthday Photography', 5, 'Booked them for my daughter''s first birthday. The team was patient with the kids and captured beautiful candid moments. Very happy with the photos!', '2024-08-25', true, false),
  ('Neha & Vikram', 'Destination Wedding', 5, 'We hired SP Digital for our Jaipur wedding and they exceeded all expectations. The drone footage was breathtaking. Worth every rupee!', '2024-12-01', true, true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;
