/**
 * Created by tommy on 2016/6/11.
 */

import React, {Component} from 'react';
import user from '../api/user';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }



    handleUsername(e) {
        this.setState({username: e.target.value});
        // console.log("username="+this.state.username);
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
        // console.log("password="+this.state.password);
    }

    handleLogin(e){
        var username = this.state.username;
        var password = this.state.password;
        // console.log("username="+this.state.username);
        // console.log("password="+this.state.password);
        var q = {};
        q.username = username;
        q.password = password;
        user.login(q,function (rs) {
            if (rs.status==200){
                // localStorage.setItem("user", JSON.stringify(rs.data.user));
                // localStorage.setItem("last_login", new Date().getTime());
                alert("Welcome:"+rs.data.name);
                if (params['from']) {
                    window.location.href = params['from'];
                }else {
                    alert("do nothing");    
                }
            }else {
                alert(rs.data.errormsg);
            }
        })
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