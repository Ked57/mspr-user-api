export type User = {
  auth_id: string;
  user_name: string;
};

export const isUser = (user: any): user is User =>
  user &&
  typeof user.auth_id === "string" &&
  typeof user.user_name === "string";
