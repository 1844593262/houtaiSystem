
var siteName = 'Project Cost';

export var pageTitle = (routerTitle) => {
    if (routerTitle) {
        return routerTitle + ' - ' + siteName;
    } else {
        return siteName;
    }
}