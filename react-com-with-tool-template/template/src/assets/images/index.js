import * as dark from './dark.js';
import * as light from './light.js';
export const themeTypes = {
  dark,
  light,
};

const images = (function(){
  const theme = localStorage.getItem('theme-style') || 'dark';
  return themeTypes[theme];
})();
export default images;