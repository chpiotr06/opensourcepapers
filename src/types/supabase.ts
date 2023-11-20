export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string
          id: string
          name: string
          role: string
          scientific_profile_id: string | null
          surname: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
          role?: string
          scientific_profile_id?: string | null
          surname: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          role?: string
          scientific_profile_id?: string | null
          surname?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profiles_scientific_profile_id_fkey'
            columns: ['scientific_profile_id']
            isOneToOne: false
            referencedRelation: 'scientific_profiles'
            referencedColumns: ['id']
          },
        ]
      }
      scientific_profiles: {
        Row: {
          created_at: string
          degree: string
          id: string
          institution: string
          is_verified: boolean
          scientific_discipline: string
        }
        Insert: {
          created_at?: string
          degree: string
          id?: string
          institution: string
          is_verified?: boolean
          scientific_discipline: string
        }
        Update: {
          created_at?: string
          degree?: string
          id?: string
          institution?: string
          is_verified?: boolean
          scientific_discipline?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
