import {
  themeTypes
} from '@/assets/images';
const setAttribute = function () {
  let type = null;
  const themeCache = localStorage.getItem('theme-style') || null;
  const themeTypesKey = Object.keys(themeTypes);
  if (themeTypesKey.length) {
    const isVlidThemeCache = themeCache && themeTypesKey.includes(themeCache);
    type = isVlidThemeCache && themeCache;
  } else {
    type = 'dark';
  }
  const root = document.getElementById('root');
  if (root && type) {
    localStorage.setItem('theme-style',type);
    root.setAttribute('theme-style', type);
  } else {
    //default theme
    localStorage.setItem('theme-style','dark');
    root.setAttribute('theme-style', 'dark');
  }
};

export default setAttribute;