/* TODO fix type */
// @ts-ignore
// @ts-nocheck

export const get = (ob: any, path: string) => {
  const p = path.split(".");
  for (let i = 0; i < p.length; i++) {
    ob = ob?.[p[i]];
  }
  return ob;
};

export const set = (ob: any, value: any, path: string) => {
  path = path.split(".");
  for (let i = 0; i < path.length - 1; i++) {
    ob?.[path[i]] ? null : (ob[path[i]] = {});
    ob = ob?.[path[i]];
  }
  // TODO The left-hand side of an assignment expression may not be an optional property access
  // @ts-ignore: Unreachable code error
  ob?.[path[i]] = value;
};

export const downloadObjectAsJson = (exportObj: any, exportName: any) => {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const interpolate = (t, c) => {
  return t.replace(/\${([^}]+)}/g,
    (m,p)=>p.split('.').reduce((a,f)=>a?a[f]:undefined,c)??m);
}


