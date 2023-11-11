export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      Profiles: {
        Row: {
          created_at: string
          id: string
          Name: string
          Surname: string
        }
        Insert: {
          created_at?: string
          id: string
          Name: string
          Surname: string
        }
        Update: {
          created_at?: string
          id?: string
          Name?: string
          Surname?: string
        }
        Relationships: [
          {
            foreignKeyName: 'Profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
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
