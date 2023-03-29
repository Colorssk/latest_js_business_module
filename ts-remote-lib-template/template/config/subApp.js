const helDevUtils = require('hel-dev-utils');
const pkg = require('../package.json');
// unpkg
let subApp = helDevUtils.createLibSubApp(pkg, { npmCdnType: '<%= npmCdnType %>', homePage: '<%= cdnURI %>' });
if (!pkg.isUnpkg){
    // file server
    subApp = helDevUtils.createLibSubApp(pkg, { homePage: `${pkg.fileService}/${pkg.name}/${pkg.version}`,  handleHomePage: false });
}

module.exports = subApp;

