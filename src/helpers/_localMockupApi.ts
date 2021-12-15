// @ts-nocheck
import { useState, useEffect } from "react";
   
export const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const stickyValue = localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

// --------------------------------------------------------------------------------
export const getPageBySlug = (slug, posts) => {
  return posts?.find(ob => ob.slug === slug) ||
    {
      title: '',
      slug: slug,
      layout: 'main',
      type:'page',
      new: true
    }
}

export const setItemToStorage = (element, elements, set, key) => {
  const copy = elements?.map(el => ({ ...el })) || []
  const updateEl = copy?.find(x => x[key] === element[key])
  updateEl ? updateEl = Object.assign(updateEl, element) : copy.push(element)
  set(copy)
  return element
}

export const removeItemFromStorage = (elements, set, key, value) => {
  const copy = elements?.map(el => ({ ...el })) || []
  const updateCopy = copy?.filter(x => x[key] !== value)
  console.log(updateCopy)
  set(updateCopy)
  // TODO Remove all childerens //
}

