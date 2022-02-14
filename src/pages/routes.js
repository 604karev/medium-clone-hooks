import React from "react";
import { Route, Routes } from 'react-router-dom'
import GlobalFeed from "./globalFeed";
import Article from "./article";
import Authentication from './authentication'
import CreateArticle from "./createArticle";
import EditArticle from "./editArticle";


const Router = () => (
    <Routes>
        <Route path='/' element={<GlobalFeed />} >
            <Route path='tags' element={<GlobalFeed />} >
                <Route path=':tag' element={<GlobalFeed />} />
            </Route>
            <Route path='feed' element={<GlobalFeed />} />
        </Route>
        <Route path='/login' element={<Authentication />} />
        <Route path='/register' element={<Authentication />} />
        <Route path='/article' element={<GlobalFeed />} />            
        <Route path='/article/:slug' element={<Article />} />
        <Route path='/article/new' element={<CreateArticle />} />
        <Route path='/article/:slug/edit' element={<EditArticle />} />
    </Routes >
)
export default Router