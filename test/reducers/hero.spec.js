import { Map, fromJS } from 'immutable'
import reducer from 'reducers/hero'

require('jasmine-immutablejs-matchers')

let INITIAL_STATE = Map()

describe('Hero reducer', () => {
    beforeEach(() => {
        INITIAL_STATE = Map();
    });

    it('handles GET_HERO_REQUEST', () => {
        const action = {
            type: 'GET_HERO_REQUEST'
        }

        const nextState = reducer(INITIAL_STATE, action)

        expect(nextState).toBeImmutable();
        expect(nextState).toEqualImmutable(fromJS({
            isLoading: true,
            error: null
        }))
    })

    it('handles GET_HERO_SUCCESS', () => {
        const action = {
            type: 'GET_HERO_SUCCESS',
            hero: {}
        }

        const nextState = reducer(INITIAL_STATE, action)

        expect(nextState).toBeImmutable();
        expect(nextState).toEqualImmutable(fromJS({
            isLoading: false,
            error: null,
            hero: {}
        }))
    })
})
