// types/database.ts

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
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
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
        Update: Partial<Database["public"]["Tables"]["applications"]["Insert"]>;
      };
    };
  };
};
