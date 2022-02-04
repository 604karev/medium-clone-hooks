import React from "react";
import { Switch, Route } from 'react-router-dom'
import GlobalFeed from "./globalFeed";
import Article from "./article";
import Authentication from './authentication'

const Routes = () => (
    <Switch>
        <Route path='/' component={GlobalFeed} exact />
        <Route path='/login' component={Authentication} />
        <Route path='/register' component={Authentication} exact />
        <Route path='/article/:slug' component={Article} />
    </Switch>
)
export default Routes