import React, { PropTypes } from 'react'

class Layout extends React.Component {
    static propTypes = {
        children: PropTypes.element
    };

    render () {
        const { children } = this.props

        return <div className="Layout">
            { children }
        </div>
    }
}

export default Layout
