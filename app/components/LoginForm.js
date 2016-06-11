/**
 * Created by tommy on 2016/6/11.
 */

import React, {Component} from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.state = {
            username: '',
            password:''
        };
    }

    handleUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(){
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        console.log(username);
        console.log(password);
    }

    render() {
        return (
            <div>
                <form method="post" className="am-form">
                    <label for="username">Username</label>
                    <input type="text" name="" id="username" ref="username"  onChange={this.handleUsername}/>
                    <br/>
                    <label for="password">Password</label>
                    <input type="password" name="" id="password" ref="password" onChange={this.handlePassword}/>
                    <br/>
                    <div className="am-cf">
                        <input type="button" onClick={this.handleLogin} name="" value="Login" className="am-btn am-btn-primary am-btn-sm am-fl" />
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm