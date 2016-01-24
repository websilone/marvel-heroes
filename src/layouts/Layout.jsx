import React, { PropTypes } from 'react'

const styles = {
    container : {
        marginTop: '3em'
    }
}

class Layout extends React.Component {
    static propTypes = {
        children: PropTypes.element
    };

    render () {
        const { children } = this.props

        return <div className="Layout" style={ styles.container }>
            { children }
        </div>
    }
}

export default Layout
