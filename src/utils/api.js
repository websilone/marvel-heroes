import md5 from 'js-md5'

const BASE_URL = 'http://gateway.marvel.com:80'
const API_KEY = '298bab46381a6daaaee19aa5c8cafea5'
const API_PRIVATE = 'b0223681fced28de0fe97e6b9cd091dd36a5b71d'

/**
 * Creates a MD5 hash from the given timestamp, the API private key ans the API public key
 * @param ts { timestamp }
 * @returns { Object }
 */
const makeHash = ts => {
    let hash = md5.create()
    hash.update(`${ts}${API_PRIVATE}${API_KEY}`)
    hash.hex()
    return hash
}

/**
 *
 * @returns { Promise }
 */
const getHeroes = () => {
    const ts = Date.now()
    const hash = makeHash(ts)
    const url = `${BASE_URL}/v1/public/characters?ts=${ts}&apikey=${API_KEY}&hash=${hash}`
    return fetch(url)
        .then((res) => res.json())
}

/**
 *
 * @param id
 * @returns { Promise }
 */
const getHero = id => {
    // Should check if id is provided
    // if not return a rejected promise with an error message
    const ts = Date.now()
    const hash = makeHash(ts)
    const url = `${BASE_URL}/v1/public/characters/${id}?ts=${ts}&apikey=${API_KEY}&hash=${hash}`
    return fetch(url)
        .then((res) => res.json())
}

export {
    getHeroes,
    getHero
}
