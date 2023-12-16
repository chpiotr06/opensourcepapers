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
          is_reviewed: boolean
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
          is_reviewed?: boolean
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
          is_reviewed?: boolean
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
  ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never
