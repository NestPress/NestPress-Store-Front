// @ts-nocheck
import { useState, useEffect } from 'react';
export const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const stickyValue = localStorage.getItem(key);
      return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
    }
    
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// import { usePage } from 'store/pageStore'

// export const getBlogPages = () => {
// 	let pages
// 	if (typeof window !== "undefined") {
// 		pages = sessionStorage.getItem('npPages')
// 	}
// 	return pages && JSON.parse(pages)
// }

// export const getMockupPage = (slug) => {
// 	const pages = getBlogPages();
// 	const page = pages ? pages.find(x => x.slug === slug) : {};
// 	usePage.setState({page:Object.assign({},page)})
// 	// return page;
// }

// export const setPage = (input) => {
// 	let pages = getBlogPages();
// 	if(!pages) pages = []
// 	const page = pages.find(x => x.slug === input.slug);
// 	!page 
// 		? pages.push(input)
// 		: page = Object.assign(page, input);

	
// 	if (typeof window !== "undefined") {
// 		sessionStorage.setItem('npPages', JSON.stringify(pages));
// 	}
// }


// export const Mock = {
// 	getPages: function () {
//     return Promise.resolve().then(function () {
//       const pages = sessionStorage.getItem('npPages')
//       return pages && JSON.parse(pages)
//     });
//   },	
//   getPage: async function (slug) {
//     await null;
//     return Promise.resolve().then(function () {
//       const pages = sessionStorage.getItem('npPages')
//       const parsePages = pages && JSON.parse(pages)
//       return parsePages ? parsePages.find(x => x.slug === slug) : {
//         title: '',
//         slug: '',
//         layout: ''
//       };
//     });
//   }, 
//   setPage:  function (data) {
//     return Promise.resolve().then(function () {
//       const pages = sessionStorage.getItem('npPages')
//       const parsePages = pages && JSON.parse(pages)
//       if(!parsePages) parsePages = []
 
//       const page = parsePages.find(x => x.slug === data.slug);
//        !page 
//          ? parsePages.push(data)
//          : page = Object.assign(page, data);

//              console.log('data', parsePages)
//       // console.log(pages)
//       sessionStorage.setItem('npPages', JSON.stringify(parsePages));
//     });
//   }, 
//   setItem: function (key, value) {
//       return Promise.resolve().then(function () {
//           localStorage.setItem(key, value);
//       });
//   },
//   getItem: function (key) {
//       return Promise.resolve().then(function () {
//           return localStorage.getItem(key);
//       });
//   }
// };

