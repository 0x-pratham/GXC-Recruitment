// types/database.ts

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          email: string;
          institution: string;
          year_of_study: string;
          track: "frontend" | "backend" | "design" | "fullstack";
          portfolio_url: string | null;
          why_join: string;
          status: "pending" | "reviewed" | "accepted" | "rejected";
        };
        Insert: {
          id?: string;
          created_at?: string;
          full_name: string;
          email: string;
          institution: string;
          year_of_study: string;
          track: "frontend" | "backend" | "design" | "fullstack";
          portfolio_url?: string | null;
          why_join: string;
          status?: "pending" | "reviewed" | "accepted" | "rejected";
        };
        Update: Partial<Database['public']['Tables']['applications']['Insert']>;
      };
    };
  };
};