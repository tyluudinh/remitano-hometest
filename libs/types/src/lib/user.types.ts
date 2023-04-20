export interface User extends UserAuth {
  _id: string;
}

export interface UserAuth {
  email: string;
  password: string;
}