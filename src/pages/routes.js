import React from "react";
import { Route, Routes } from 'react-router-dom'
import GlobalFeed from "./globalFeed";
import Article from "./article";
import Authentication from './authentication'


const Router = () => (
    <Routes>
        <Route path='/' element={<GlobalFeed />} >
            <Route path='/tags' element={<GlobalFeed />} >
                <Route path=':tag' element={<GlobalFeed />} />
            </Route>            
        </Route>
        <Route path='/feed' element={<GlobalFeed yourFeed={true} />} />
        <Route path='/login' element={<Authentication isLogin={true} />} />
        <Route path='/register' element={<Authentication />} />
        <Route path='/article' element={<Article />} >
            <Route path=':slug' element={<Article />} />
        </Route>
    </Routes >
)
export default Router