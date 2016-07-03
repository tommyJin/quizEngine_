/**
 * Created by tommy on 2016/6/30.
 */
import React from 'react';
import {render} from 'react-dom';
import Question from './components/Question';
import { Router, Route, hashHistory } from 'react-router';

render(
    <Router history={hashHistory}>
        <Route path="/" component={Question}/>
    </Router>
    ,document.getElementById('root'));