export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          abstract: string
          article_no_personal_url: string
          article_url: string
          author: string
          co_authors: string | null
          created_at: string
          discipline: string
          id: string
          image_url: string
          is_reviewd: boolean
          short_desc: string
          title: string
          uploader_id: string
        }
        Insert: {
          abstract: string
          article_no_personal_url: string
          article_url: string
          author: string
          co_authors?: string | null
          created_at?: string
          discipline: string
          id?: string
          image_url: string
          is_reviewd?: boolean
          short_desc: string
          title: string
          uploader_id: string
        }
        Update: {
          abstract?: string
          article_no_personal_url?: string
          article_url?: string
          author?: string
          co_authors?: string | null
          created_at?: string
          discipline?: string
          id?: string
          image_url?: string
          is_reviewd?: boolean
          short_desc?: string
          title?: string
          uploader_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'articles_uploader_id_fkey'
            columns: ['uploader_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
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
      reviews: {
        Row: {
          article_id: string
          author: string
          co_authors: string | null
          created_at: string
          description: string
          id: string
          review_url: string
          title: string
          uploader_id: string
        }
        Insert: {
          article_id: string
          author: string
          co_authors?: string | null
          created_at?: string
          description: string
          id?: string
          review_url: string
          title: string
          uploader_id: string
        }
        Update: {
          article_id?: string
          author?: string
          co_authors?: string | null
          created_at?: string
          description?: string
          id?: string
          review_url?: string
          title?: string
          uploader_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reviews_article_id_fkey'
            columns: ['article_id']
            isOneToOne: false
            referencedRelation: 'articles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_uploader_id_fkey'
            columns: ['uploader_id']
            isOneToOne: false
            referencedRelation: 'profiles'
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
