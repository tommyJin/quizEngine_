/**
 * Created by tommy on 2016/6/11.
 */

import React, {Component} from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }



    handleUsername(e) {
        this.setState({username: e.target.value});
        console.log("username="+this.state.username);
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
        console.log("password="+this.state.password);
    }

    handleLogin(e){
        var username = this.state.username;
        var password = this.state.password;
        console.log("username="+this.state.username);
        console.log("password="+this.state.password);
    }

    render() {
        return (
            <div>
                <form className="am-form" >
                    <label for="username">Username</label>
                    <input type="text" name="" id="username" ref="username" onBlur={this.handleUsername}/>
                    <br/>
                    <label for="password">Password</label>
                    <input type="password" name="" id="password" ref="password" onBlur={this.handlePassword}/>
                    <br/>
                    <div className="am-cf">
                        <button type="button" onClick={this.handleLogin} className="am-btn am-btn-primary am-btn-sm am-fl" >Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm