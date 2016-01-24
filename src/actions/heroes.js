import Immutable from 'immutable'
import { getHeroes, getHero } from 'utils/api'
import { GET_HEROES_REQUEST, GET_HEROES_SUCCESS } from 'constants/heroes'
import { GET_HERO_REQUEST, GET_HERO_SUCCESS } from 'constants/hero'

/**
 * Checks if the list of heroes has already been fetched
 * @param state Immutable map
 * @returns { boolean }
 */
const shouldLoadHeroes = state => !state.get('haveBeenLoaded', false)

/**
 * Looks for the given hero ID in the heroes Immutable state
 * @param heroes Immutable map
 * @param id ID of the hero to display
 * @returns { Map | undefined }
 */
const getHeroFromId = (heroes, id) => {
    const hero = heroes.get('heroes', Immutable.List()).find(hero => {
        return hero.get('id') === Number(id)
    }, undefined)

    return hero
}

/**
 * Redux action creator
 * if heroes list have never been fetched,
 * 1. dispatch a GET_HEROES_REQUEST action
 * 2. calls the API getHeroes() function
 * 3. then dispatch a GET_HEROES_SUCCESS action with the json
 * @returns {Function}
 */
const loadHeroes = () => {
    return (dispatch, getState) => {
        if (shouldLoadHeroes(getState().heroes)) {
            dispatch({ type: GET_HEROES_REQUEST })

            getHeroes().then(json => {
                dispatch({
                    type: GET_HEROES_SUCCESS,
                    heroes: json.data.results
                })
            })

            // TODO : handle error
        }
    }
}

/**
 * Redux action creator
 * if hero data exist (from global list),
 * dispatch a GET_HERO_SUCCESS action with the hero data
 * else
 * 1. dispatch a GET_HERO_REQUEST action
 * 2. calls the API getHero() function
 * 3. then dispatch a GET_HERO_SUCCESS action with the json
 * @param id
 * @returns {Function}
 */
const loadHero = id => {
    return (dispatch, getState) => {
        const localHero = getHeroFromId(getState().heroes, id)

        if (localHero) {
            dispatch({
                type: GET_HERO_SUCCESS,
                hero: localHero.toJS()
            })
        }
        else {
            dispatch({ type: GET_HERO_REQUEST });

            getHero(id)
                .then(json => {
                    dispatch({
                        type: GET_HERO_SUCCESS,
                        hero: json.data.results[0]
                    })
                })

            // TODO : handle error
        }
    }
}

export {
    loadHeroes,
    loadHero
}
