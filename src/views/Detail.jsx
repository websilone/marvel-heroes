import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'

import { loadHero } from 'actions/heroes'
import ItemsList from 'components/ItemsList'

const styles = {
    title: {
        marginBottom: '1em'
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
        window.scrollTo(0, 0);
        this.props.loadHero(this.props.params.id)
    }

    render () {
        const { isLoading } = this.props

        return (
            <div className="ui container" style={ styles.container }>
                <div className="ui segment">
                    <Link to="/heroes" className="ui labeled icon button">
                        <i className="left arrow icon"></i>
                        Back to Heroes' List
                    </Link>
                </div>

                {
                    isLoading
                        ? this.renderLoading()
                        : this.renderHero()
                }
            </div>
        )
    }

    renderLoading () {
        return <div className="ui center segment">
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading hero detail...</div>
            </div>
        </div>
    }

    renderHero () {
        const { hero } = this.props

        const picture = `${hero.getIn(['thumbnail', 'path'])}.${hero.getIn(['thumbnail', 'extension'])}`
        const name = hero.get('name')
        const description = hero.get('description', '')
        const comicsList = hero.getIn(['comics', 'items'], Immutable.List())
        const seriesList = hero.getIn(['series', 'items'], Immutable.List())

        return <div className="ui grid">
            <div className="six wide column">
                <img className="ui large rounded image" src={ picture } alt={ name } />
            </div>

            <div className="ten wide column">
                <div className="ui segment">
                    <h1 style={ description !== '' ? styles.title : { marginBottom: 0 } } className="ui header">{ name }</h1>

                    {
                        description !== ''
                            ? <p>{ description }</p>
                            : ''
                    }
                </div>

                { comicsList.size > 0 && <ItemsList title="Comics" list={ comicsList } /> }
                { seriesList.size > 0 && <ItemsList title="Series" list={ seriesList } /> }
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
