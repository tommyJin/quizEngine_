/**
 * Created by tommy on 2016/6/16.
 */

import React, {Component} from 'react';
import user from '../api/user';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.handleName = this.handleName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        // this.handleLogin = this.handleLogin.bind(this);
    }

    

    handlePassword(e) {
        this.setState({password: e.target.value});
        console.log("password="+this.state.password);
    }


    handleName(e) {
        this.setState({name: e.target.value});
        console.log("name="+this.state.name);
    }
    
    handleSubmit(e){
        var name = this.state.name;
        var password = this.state.password;
        console.log("name="+this.state.name);
        console.log("password="+this.state.password);
        var q = {};
        q.name = name;
        q.password = password;
        user.update(q,function (rs) {
            if (rs.status==200){
                localStorage.setItem("user", JSON.stringify(rs.data.user));
                alert(rs.data.errormsg);
                if (params['from']) {
                    window.location.href = params['from'];
                }else {
                    alert("no where to go");
                }
            }else {
                alert(rs.data);
            }
        })
    }


    render() {
        return (
            <form role="form" id="form">
                <div className="input_div">
                    <label className="input_left">Username</label>
                    <input type="text" disabled className="form-control input_right"/>
                </div>
                <div className="input_div">
                    <label className="input_left">Password</label>
                    <input type="password" disabled id="password" name="password" onBlur={this.handlePassword} className="form-control input_right"/>
                </div>
                <div className="input_div">
                    <label className="input_left">Real Name</label>
                    <input type="text" id="name" name="name" onBlur={this.handleName} className="form-control input_right"/>
                </div>
                <button type="button" onClick={this.handleSubmit} className="btn btn-default">Submit</button>
                <button type="reset" className="btn btn-default">Reset</button>

                <input type="hidden" id="id" name="id" />
            </form>
        )
    }


}

export default UserProfile