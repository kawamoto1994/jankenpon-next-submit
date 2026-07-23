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
        Update: never;
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
        Update: never;
      };
    };
  };
}
