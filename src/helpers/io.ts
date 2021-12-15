export const get = (ob: any, path: string) => {
  const p = path.split(".");
  for (let i = 0; i < p.length; i++) {
    ob = ob?.[p[i]];
  }
  return ob;
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
