/* TODO fix type */
// @ts-ignore
// @ts-nocheck

import { getFromStore } from "store";
import { interpolate } from "helpers";

export const mainLayout: any = [
  "${router.slugPath.0}-layout",
  "${router.slugPath.1}",
  "footer-layout",
];

export const handlingLayouts = () => {
  return JSON.parse(
    interpolate(JSON.stringify(mainLayout), {
      router: getFromStore({ store: "router" }),
    }).toLowerCase()
  );
};

export const remapHandlers = (list: any) => {
  return list.map((el) =>
    el.attrs.handler
      ? {
          ...el,
          archiveId: el.id,
          id: interpolate(el.attrs.handler, {
            router: getFromStore({ store: "router" }),
          }).toLowerCase(),
        }
      : el
  );
};
