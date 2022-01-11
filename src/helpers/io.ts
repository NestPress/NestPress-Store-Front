/* TODO fix type */
// @ts-ignore
// @ts-nocheck

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



export const getBy = (ob: any, path: string) => {
  const p = path.split(".");
  for (let i = 0; i < p.length; i++) {
    ob = ob?.[p[i]];
  }
  return ob;
};

export const setBy = (obj, path, val) => {
  path.split && (path=path.split('.'));
  var i=0, l=path.length, t=obj, x, k;
  while (i < l) {
    k = path[i++];
    if (k === '__proto__' || k === 'constructor' || k === 'prototype') break;
    t = t[k] = (i === l) ? val : (typeof(x=t[k])===typeof(path)) ? x : (path[i]*0 !== 0 || !!~(''+path[i]).indexOf('.')) ? {} : [];
  }
}

