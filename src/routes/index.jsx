import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import Layout from 'layouts/Layout'
import { ListContainer } from 'views/List'
import { DetailsContainer } from 'views/Details'

const getRoutes = (store) => (
    <Route path="/" component={ Layout }>
        <Route path="heroes" component={ ListContainer } />
        <Route path="heroes/:id" component={ DetailsContainer } />
        <IndexRedirect to="heroes" />
    </Route>
)

export default getRoutes;
