function getURLfromHTML(HTMLbody, baseURL){
    const urls = []
    return urls
}




function normalizeURL(urlString){
    /* new URL() gives the URL Object. */
    /* We are parsing the URL String in to an object. */  
    const urlObj = new URL(urlString)

    /* Return the hostname and the pathname in the form of a string. */
    const hostPath = urlObj.hostname + urlObj.pathname
    /* Taking care of trailing slashes. */
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLfromHTML
}