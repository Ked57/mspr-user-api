export const parse = (payload: string | object) =>
  typeof payload === "string" ? JSON.parse(payload) : payload;
