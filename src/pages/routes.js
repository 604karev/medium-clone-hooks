import React from "react";
import {Switch, Route} from 'react-router-dom'
import GlobalFeed from "pages/globalFeed";
import Article from "pages/article";

export default () => (
    <Switch>
        <Route path='/' component={GlobalFeed} exact />
        <Route path='/article/:slug' component={Article}/>
    </Switch>
)
