// const withPlugins = require('next-compose-plugins');
// const withImages = require('next-images');
// const nextConfig = {
//   webpack: (config) => {
//     return config;
//   },
// };
// module.exports = withPlugins([withImages], nextConfig);


const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);
const nextConfig = {
  
  webpack: (config) => {
    return config;
  },
};

module.exports = withPlugins([withImages,withTM], nextConfig);




