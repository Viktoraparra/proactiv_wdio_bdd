const { browser } = require('@wdio/globals')

module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async open(path) {
        await browser.url(path);
    }
}
