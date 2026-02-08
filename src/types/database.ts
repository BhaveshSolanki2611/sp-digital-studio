// Supabase Database Types
// Run `npx supabase gen types typescript` after creating tables to regenerate

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          phone: string | null
          name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          phone?: string | null
          name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          name?: string | null
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string
          phone: string
          service_type: string
          event_date: string
          event_end_date: string | null
          location: string | null
          package_type: string | null
          budget: string | null
          notes: string | null
          files: string[] | null
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          payment_status: 'unpaid' | 'partial' | 'paid'
          total_amount: number | null
          paid_amount: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email: string
          phone: string
          service_type: string
          event_date: string
          event_end_date?: string | null
          location?: string | null
          package_type?: string | null
          budget?: string | null
          notes?: string | null
          files?: string[] | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          payment_status?: 'unpaid' | 'partial' | 'paid'
          total_amount?: number | null
          paid_amount?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string | null
          name?: string
          email?: string
          phone?: string
          service_type?: string
          event_date?: string
          event_end_date?: string | null
          location?: string | null
          package_type?: string | null
          budget?: string | null
          notes?: string | null
          files?: string[] | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          payment_status?: 'unpaid' | 'partial' | 'paid'
          total_amount?: number | null
          paid_amount?: number | null
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          customer_name: string
          customer_email: string
          customer_phone: string
          shipping_address: string | null
          pickup_option: boolean
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_method: 'razorpay' | 'paypal' | 'upi' | 'cod'
          payment_id: string | null
          payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
          subtotal: number
          shipping: number
          tax: number
          total: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          customer_name: string
          customer_email: string
          customer_phone: string
          shipping_address?: string | null
          pickup_option?: boolean
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_method: 'razorpay' | 'paypal' | 'upi' | 'cod'
          payment_id?: string | null
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          subtotal: number
          shipping?: number
          tax?: number
          total: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          shipping_address?: string | null
          pickup_option?: boolean
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_method?: 'razorpay' | 'paypal' | 'upi' | 'cod'
          payment_id?: string | null
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          subtotal?: number
          shipping?: number
          tax?: number
          total?: number
          notes?: string | null
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          product_name: string
          quantity: number
          unit_price: number
          options: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          product_name: string
          quantity: number
          unit_price: number
          options?: Json | null
          created_at?: string
        }
        Update: {
          order_id?: string
          product_id?: string
          product_name?: string
          quantity?: number
          unit_price?: number
          options?: Json | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          category: string
          description: string | null
          price: number
          compare_price: number | null
          images: string[]
          options: Json | null
          in_stock: boolean
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          category: string
          description?: string | null
          price: number
          compare_price?: number | null
          images: string[]
          options?: Json | null
          in_stock?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          slug?: string
          category?: string
          description?: string | null
          price?: number
          compare_price?: number | null
          images?: string[]
          options?: Json | null
          in_stock?: boolean
          featured?: boolean
          updated_at?: string
        }
      }
      equipment: {
        Row: {
          id: string
          name: string
          description: string | null
          daily_rate: number
          hourly_rate: number | null
          images: string[]
          available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          daily_rate: number
          hourly_rate?: number | null
          images: string[]
          available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          daily_rate?: number
          hourly_rate?: number | null
          images?: string[]
          available?: boolean
          updated_at?: string
        }
      }
      equipment_bookings: {
        Row: {
          id: string
          equipment_id: string
          user_id: string | null
          customer_name: string
          customer_email: string
          customer_phone: string
          start_date: string
          end_date: string
          total_amount: number
          status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          payment_status: 'unpaid' | 'paid' | 'refunded'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          equipment_id: string
          user_id?: string | null
          customer_name: string
          customer_email: string
          customer_phone: string
          start_date: string
          end_date: string
          total_amount: number
          status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          payment_status?: 'unpaid' | 'paid' | 'refunded'
          created_at?: string
          updated_at?: string
        }
        Update: {
          equipment_id?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          start_date?: string
          end_date?: string
          total_amount?: number
          status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          payment_status?: 'unpaid' | 'paid' | 'refunded'
          updated_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          source: string | null
          status: 'new' | 'read' | 'replied' | 'archived'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          source?: string | null
          status?: 'new' | 'read' | 'replied' | 'archived'
          created_at?: string
        }
        Update: {
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          source?: string | null
          status?: 'new' | 'read' | 'replied' | 'archived'
        }
      }
      restoration_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          file_url: string
          description: string | null
          service_type: 'restoration' | 'colorization' | 'both'
          estimated_price: number | null
          status: 'pending' | 'quoted' | 'approved' | 'in_progress' | 'completed' | 'cancelled'
          result_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          file_url: string
          description?: string | null
          service_type?: 'restoration' | 'colorization' | 'both'
          estimated_price?: number | null
          status?: 'pending' | 'quoted' | 'approved' | 'in_progress' | 'completed' | 'cancelled'
          result_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          email?: string
          phone?: string | null
          file_url?: string
          description?: string | null
          service_type?: 'restoration' | 'colorization' | 'both'
          estimated_price?: number | null
          status?: 'pending' | 'quoted' | 'approved' | 'in_progress' | 'completed' | 'cancelled'
          result_url?: string | null
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          email: string | null
          service: string | null
          rating: number
          text: string
          photo_url: string | null
          event_date: string | null
          approved: boolean
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          service?: string | null
          rating: number
          text: string
          photo_url?: string | null
          event_date?: string | null
          approved?: boolean
          featured?: boolean
          created_at?: string
        }
        Update: {
          name?: string
          email?: string | null
          service?: string | null
          rating?: number
          text?: string
          photo_url?: string | null
          event_date?: string | null
          approved?: boolean
          featured?: boolean
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          name: string | null
          subscribed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          subscribed?: boolean
          created_at?: string
        }
        Update: {
          email?: string
          name?: string | null
          subscribed?: boolean
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

// Utility types for easier use
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Commonly used types
export type Booking = Tables<'bookings'>
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>
export type Product = Tables<'products'>
export type Equipment = Tables<'equipment'>
export type EquipmentBooking = Tables<'equipment_bookings'>
export type Inquiry = Tables<'inquiries'>
export type RestorationRequest = Tables<'restoration_requests'>
export type Testimonial = Tables<'testimonials'>
