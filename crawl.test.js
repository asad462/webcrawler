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
