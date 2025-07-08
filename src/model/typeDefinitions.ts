export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
