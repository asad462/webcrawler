/* Helps in accessing DOM APIs */
const { JSDOM } = require('jsdom')

async function crawlPage(currentURL){
    console.log("Currently crawling : " + currentURL)
    try{
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log("Error in fetch with status code : " + resp.status + " on page : " + currentURL)
            return
        }

        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log("Non HTML response, content type is " + contentType + " on page : " + currentURL)
            return
        }
        /* .text() gives HTML Output. Response body is formatted as HTML, it returns a promise */
        console.log(await resp.text())
    }
    catch(err){
        console.log("Error : " + err.message + ", on page : " + currentURL)
    }
    
}


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
    getURLfromHTML,
    crawlPage
}