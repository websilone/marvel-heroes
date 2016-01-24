import Immutable from 'immutable'
import { getHeroes, getHero } from 'utils/api'
import { GET_HEROES_REQUEST, GET_HEROES_SUCCESS } from 'constants/heroes'
import { GET_HERO_REQUEST, GET_HERO_SUCCESS } from 'constants/hero'

const shouldLoadHeroes = state => !state.get('haveBeenLoaded', false)
const getHeroFromId = (heroes, id) => {
    const hero = heroes.get('heroes', Immutable.List()).find(hero => {
        return hero.get('id') === Number(id)
    }, undefined)

    return hero
}

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
        }
    }
}

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
        }
    }
}

export {
    loadHeroes,
    loadHero
}
