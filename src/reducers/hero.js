import Immutable from 'immutable'
import createReducer from 'utils/createReducer'

import { GET_HERO_REQUEST, GET_HERO_SUCCESS } from 'constants/hero'

const INITIAL_STATE = Immutable.Map()

export default createReducer(INITIAL_STATE, {
    [GET_HERO_REQUEST] (state) {
        return state.merge({
            isLoading: true,
            error: null
        })
    },

    [GET_HERO_SUCCESS] (state, { hero }) {
        return state.merge({
            isLoading: false,
            error: null,
            hero
        })
    }
})
