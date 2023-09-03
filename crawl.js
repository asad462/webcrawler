/* Helps in accessing DOM APIs */
const { JSDOM } = require('jsdom')
function getURLfromHTML(HTMLbody, baseURL){
    const urls = []
    const dom = new JSDOM(HTMLbody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1) === '/'){
            // We are working with a relative URL
            try{
                const urlObj = new URL(baseURL + linkElement.href)
                urls.push(urlObj.href)
            } 
            catch(err){
                console.log('error with the relative URL : ' + err.message)
            }
            
        }
        else{
            // We are working with an absolute URL
            try{
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } 
            catch(err){
                console.log('error with the absolute URL : ' + err.message)
            }
        }
        
    }
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