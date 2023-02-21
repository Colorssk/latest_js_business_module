const helDevUtils = require('hel-dev-utils');
const pkg = require('../package.json');

const subApp = helDevUtils.createReactSubApp(pkg, { npmCdnType: '<%= npmCdnType %>', homePage: '<%= cdnURI %>' });

module.exports = subApp;
