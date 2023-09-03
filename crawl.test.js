const { normalizeURL, getURLfromHTML } = require('./crawl.js')
const {test, expect} = require('@jest/globals')

/* To find out what page we are in, it is important to know the domain name and the path of the URL. So, we strip the protocol off the URL and compare the string.  */
test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('normalizeURL capitals', () => {
    const input = 'http://blog.BOOT.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLfromHTML absolute', () => {
    const inputHTMLbody = '<html> <body> <a href="https://blog.boot.dev/path/"> Boot.dev Blog </a> </body></html>'
    const inputbaseURL  = "https://blog.boot.dev/path/"
    const actual = getURLfromHTML(inputHTMLbody,inputbaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLfromHTML relative', () => {
    const inputHTMLbody = '<html> <body> <a href="/path/"> Boot.dev Blog </a> </body></html>'
    const inputbaseURL  = "https://blog.boot.dev"
    const actual = getURLfromHTML(inputHTMLbody,inputbaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLfromHTML both', () => {
    const inputHTMLbody = '<html> <body> <a href="https://blog.boot.dev/path1/"> Boot.dev Blog Path One </a><a href="/path2/"> Boot.dev Blog Path Two </a> </body></html>'
    const inputbaseURL  = "https://blog.boot.dev"
    const actual = getURLfromHTML(inputHTMLbody,inputbaseURL)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLfromHTML invalid', () => {
    const inputHTMLbody = '<html> <body> <a href="invalid"> Invalid URL </a> </body> </html>'
    const inputbaseURL  = "https://blog.boot.dev"
    const actual = getURLfromHTML(inputHTMLbody,inputbaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})
