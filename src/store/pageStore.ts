import create from "zustand";
import produce from "immer";


const usePage = create((set) => ({ 
  page: { 
    slug: '',
    title: '',
    layout: '',
  },
}));

export { usePage };