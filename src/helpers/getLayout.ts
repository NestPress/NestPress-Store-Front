import { layouts } from "blogData/config";
/* TODO fix any type */
// @ts-ignore: Unreachable code error
export const getLayout = (router: any) => {
  // @ts-ignore: Unreachable code error
  return layouts[router.asPath.split("/")[1]] || "Layout";
};
