/**
 * Created by tommy on 2016/6/11.
 */

import React, {Component} from 'react';

class LoginForm extends Component {
    render() {
        return (
            <div>
            <form method="post" className="am-form">
                <label for="email">Username</label>
                <input type="email" name="" id="email" value=""/>
                <br/>
                    <label for="password">Password</label>
                    <input type="password" name="" id="password" refs="password" value=""/>
                    <br/>
                            <div className="am-cf">
                                <input type="submit" name="" value="Login" className="am-btn am-btn-primary am-btn-sm am-fl"/>
                            </div>
            </form>
                </div>
    );
    }
    }

    export default LoginForm