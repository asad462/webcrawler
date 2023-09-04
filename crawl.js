/* Helps in accessing DOM APIs */
const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){
    
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    /* If this page is already seen.... */
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1

    console.log("Currently crawling : " + currentURL)

    try{
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log("Error in fetch with status code : " + resp.status + " on page : " + currentURL)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log("Non HTML response, content type is " + contentType + " on page : " + currentURL)
            return pages
        }
        /* .text() gives HTML Output. Response body is formatted as HTML, it returns a promise */
        const HTMLbody = await resp.text()

        /* Extract URLs from HTML */

       const nextURLs = getURLfromHTML(HTMLbody,baseURL)

        for(const nextURL of nextURLs){
            /* We will recursively crawl these pages */
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    
    }
    catch(err){
        console.log("Error : " + err.message + ", on page : " + currentURL)
    }

    return pages
    
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