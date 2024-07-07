import { URL } from "./testplane/constants";

export const buildUrl = (pathname = "") => {
  const BUG_ID = process.env.BUG_ID || "";
  return BUG_ID ? `${URL}${pathname}?bug_id=${BUG_ID}` : URL + pathname;
};
