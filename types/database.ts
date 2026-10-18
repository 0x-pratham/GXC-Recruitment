export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      applications: {
        Row: {
          id: string;
          created_at: string;
          first_name: string;
          last_name: string;
          phone: string;
          email: string;
          prn_number: string | null;
          gender: "male" | "female" | null;
          year_of_study: string;
          track: "frontend" | "backend" | "design" | "fullstack";
          portfolio_url: string | null;
          why_join: string;
          status: "pending" | "reviewed" | "accepted" | "rejected";
        };
        Insert: {
          id?: string;
          created_at?: string;
          first_name: string;
          last_name: string;
          phone: string;
          email: string;
          prn_number?: string | null;
          gender?: "male" | "female" | null;
          year_of_study: string;
          track: "frontend" | "backend" | "design" | "fullstack";
          portfolio_url?: string | null;
          why_join: string;
          status?: "pending" | "reviewed" | "accepted" | "rejected";
        };
        Update: {
          id?: string;
          created_at?: string;
          first_name?: string;
          last_name?: string;
          phone?: string;
          email?: string;
          prn_number?: string | null;
          gender?: "male" | "female" | null;
          year_of_study?: string;
          track?: "frontend" | "backend" | "design" | "fullstack";
          portfolio_url?: string | null;
          why_join?: string;
          status?: "pending" | "reviewed" | "accepted" | "rejected";
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
