import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { loadHeroes } from 'actions/heroes'
import Hero from 'components/Hero'

const styles = {
    title: {
        marginBottom: '2em'
    }
}

class List extends React.Component {
    static propTypes = {
        loadHeroes: PropTypes.func,
        isHeroesLoading: PropTypes.bool,
        heroes: ImmutablePropTypes.list
    };

    constructor (props) {
        super(props)
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    componentDidMount () {
        this.props.loadHeroes()
    }

    render () {
        const { isHeroesLoading } = this.props

        return (
            <div>
                <h1 style={ styles.title } className="ui center aligned header">Marvel's Super Heroes List</h1>
                {
                    isHeroesLoading
                        ? this.renderLoading()
                        : this.renderHeroes()
                }
            </div>
        )
    }

    renderLoading () {
        return <div className="ui container">
            <div className="ui center segment">
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading heroes...</div>
                </div>
            </div>
        </div>
    }

    renderHeroes () {
        const { heroes } = this.props

        return <div className="ui container">
            <div className="ui three column grid">
                {
                    heroes.map((hero, index) => {
                        const picture = `${hero.getIn(['thumbnail', 'path'])}.${hero.getIn(['thumbnail', 'extension'])}`
                        const name = hero.get('name')
                        const links = hero.get('urls')
                        const id = hero.get('id')

                        return <Hero
                            key={ index }
                            id={ id }
                            name={ name }
                            picture={ picture }
                            links={ links }
                        />
                    })
                }
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        isHeroesLoading: state.heroes.get('isLoading', true),
        heroes: state.heroes.get('heroes', Immutable.List())
    }
}

const ListContainer = connect(mapStateToProps, {
    loadHeroes
})(List)

export { List, ListContainer }
