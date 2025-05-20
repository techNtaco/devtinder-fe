export interface MatchUser {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  }
  
  export interface MatchItem {
    user: MatchUser;
    matchedAt: string; // ISO date string
  }
  