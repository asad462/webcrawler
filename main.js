const { crawlPage } = require('./crawl.js')

async function main(){
    if(process.argv.length < 3){
        console.log('No website provided.')
        process.exit(1)
    }

    if(process.argv.length > 3){
        console.log('Too many command line arguments.')
        process.exit(1)
    }

    /* for(const arg of process.argv){
        console.log(arg)
    } */

    const baseURL = process.argv[2]

    console.log('Starting crawl of : ' + baseURL)

    const pages = await crawlPage(baseURL, baseURL, {})
    /* Pages is an object here and not an array */
    for(const page of Object.entries(pages)){
        console.log(page)
    }
}

main()