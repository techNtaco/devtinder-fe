import { FeedUser } from "./feed";

export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
}

export interface FeedResponse {
  feed: FeedUser[];
}
