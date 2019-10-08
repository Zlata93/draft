function getPathFromLocation(locationPathname: string) {
    if (locationPathname.includes('.')) {
        let pathArr = locationPathname.split('/');
        pathArr = pathArr.slice(0, pathArr.length - 1);
        return pathArr.join('/');
    }
    return locationPathname
}

export default getPathFromLocation;
