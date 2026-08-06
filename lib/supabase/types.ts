export type Weapon = "rock" | "scissors" | "paper";

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          id: string;
          name: string;
          player_count: number;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          player_count: number;
          expires_at: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          player_count?: number;
          expires_at?: string;
          created_at?: string;
        };
        Relationships: [];
      };

      game_results: {
        Row: {
          id: string;
          game_id: string;
          player_name: string;
          weapon: Weapon;
          created_at: string;
        };
        Insert: {
          id?: string;
          game_id: string;
          player_name: string;
          weapon: Weapon;
          created_at?: string;
        };
        Update: {
          id?: string;
          game_id?: string;
          player_name?: string;
          weapon?: Weapon;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      game_summary: {
        Row: {
          game_id: string;
          game_name: string;
          player_count: number;
          expires_at: string;
          created_at: string;
          submitted_count: number;
        };
        Relationships: [];
      };
    };
    Functions: {};
  };
}
