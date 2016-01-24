import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { loadHero } from 'actions/heroes'

const styles = {
    container : {
        marginTop: '3em'
    },
    title: {
        marginBottom: '2em'
    }
}

class Detail extends React.Component {
    static propTypes = {
        loadHero: PropTypes.func,
        isLoading: PropTypes.bool,
        hero: ImmutablePropTypes.map,
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    };

    constructor (props) {
        super(props)
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    componentDidMount () {
        this.props.loadHero(this.props.params.id)
    }

    render () {
        const { isLoading } = this.props

        return (
            <div style={ styles.container }>
                <h1 style={ styles.title } className="ui center aligned header">Marvel's Super Heroes Detail</h1>
                {
                    isLoading
                        ? this.renderLoading()
                        : this.renderHero()
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
                    <div className="ui text loader">Loading hero detail...</div>
                </div>
            </div>
        </div>
    }

    renderHero () {
        // const { hero } = this.props

        return <div className="ui container">
            <div className="ui three column grid">
                Details here
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.hero.get('isLoading', true),
        hero: state.hero.get('hero', Immutable.Map())
    }
}

const DetailContainer = connect(mapStateToProps, {
    loadHero
})(Detail)

export { Detail, DetailContainer }
