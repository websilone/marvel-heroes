import { Map, fromJS } from 'immutable'
import reducer from 'reducers/heroes'

require('jasmine-immutablejs-matchers')

let INITIAL_STATE = Map()

describe('Heroes reducer', () => {
    beforeEach(() => {
        INITIAL_STATE = Map();
    });

    it('handles GET_HEROES_REQUEST', () => {
        const action = {
            type: 'GET_HEROES_REQUEST'
        }

        const nextState = reducer(INITIAL_STATE, action)

        expect(nextState).toBeImmutable();
        expect(nextState).toEqualImmutable(fromJS({
            isLoading: true,
            error: null
        }))
    })

    it('handles GET_HEROES_SUCCESS', () => {
        const action = {
            type: 'GET_HEROES_SUCCESS',
            heroes: []
        }

        const nextState = reducer(INITIAL_STATE, action)

        expect(nextState).toBeImmutable();
        expect(nextState).toEqualImmutable(fromJS({
            isLoading: false,
            error: null,
            haveBeenLoaded: true,
            heroes: []
        }))
    })
})
