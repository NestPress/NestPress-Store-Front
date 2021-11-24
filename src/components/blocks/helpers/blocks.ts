export const uid = () => (Math.floor(Math.random() * 9999) * 100000000 + new Date().getTime()).toString(36);

export const slugify = (string: string) => {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export const getNestedChildren = (arr: any, parent: string, withFirst: bollean) => {
    const out: any = [];
    withFirst &&  out.push(arr?.filter((x) => x.id === parent)[0]);
    for (const i in arr) {
      if (arr[i].parentId === parent) {
        const children = getNestedChildren(arr, arr[i].id, false);
        if (children.length) {
          children.map((el: any) => out.push(el));
        }
        out.push(arr[i]);
      }
    }
    return out;
  };

