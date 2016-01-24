import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import { ListContainer } from 'views/List'

const getRoutes = (store) => (
    <Route path="/">
        <Route path="heroes" component={ ListContainer } />
        <IndexRedirect to="heroes" />
    </Route>
)

export default getRoutes;
