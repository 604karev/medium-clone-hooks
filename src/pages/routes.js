import React from "react";
import { Route, Routes } from 'react-router-dom'
import GlobalFeed from "./globalFeed";
import Article from "./article";
import Authentication from './authentication'
import CreateArticle from "./createArticle";
import EditArticle from "./editArticle";
import Settings from "./settings";
import UserProfile from "./userProfile";

const Router = () => (
    <Routes>
        <Route path='/' element={<GlobalFeed />} >
            <Route path='tags' element={<GlobalFeed />} >
                <Route path=':tag' element={<GlobalFeed />} />
            </Route>
            <Route path='feed' element={<GlobalFeed />} />
        </Route>
        <Route path='/login' element={<Authentication />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/register' element={<Authentication />} />
        <Route path='/article/:slug' element={<Article />} />
        <Route path='/article/new' element={<CreateArticle />} />
        <Route path='/article/:slug/edit' element={<EditArticle />} />
        <Route path='/profiles/:slug' element={<UserProfile />} />
        <Route path='/profiles/:slug/favorites' element={<UserProfile />} />     
    </Routes >
)
export default Router