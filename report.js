/* We are writing a function unit test */
/* Takes the pages object and returns an array */
function sortPages(pages){
    /* Convert into an array */
    pagesArray = Object.entries(pages)

    /* We need to sort it */
    /* a and b represent two individual arrays */
    pagesArray.sort((a, b) => {
        /* index 1 has the count on the basis of which, we want to sort the arrays */
        aHits = a[1]
        bHits = b[1]
        /* Sort from greatest to largest*/
        return b[1] - a[1]
    })

    return pagesArray
}

function printReport(pages){
    console.log("========")
    console.log("REPORT")
    console.log("========")
    const sortedPages = sortPages(pages)

    for(const page of sortedPages){
        const url = page[0]
        const hits = page[1]
        console.log("Found " + hits + " links to page " + url)
    }

    console.log("========")
    console.log("END OF REPORT")
    console.log("========")
}

module.exports = {
    sortPages,
    printReport
}