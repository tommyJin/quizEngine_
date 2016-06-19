/**
 * Created by tommy on 2016/6/16.
 */

import React, {Component} from 'react';
import user from '../api/user';
import token from '../api/token'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.handleName = this.handleName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {username: '', password: '', email: '', name: ""};
    }

    componentWillMount() {
        console.log("componentWillMount");
    }

    componentDidMount() {
        console.log("componentDidMount");
        var self = this;
        user.getOne(self, function (rs) {
            var data = rs.data;
            console.log("user= %j", data);
            // self.state.password = data.password;
            // self.state.username = data.username;
            // self.state.name = data.name;
            // self.state.email = data.email;
            self.setState({
                username:data.username,
                password:data.password,
                name:data.name,
                email:data.email
            });
        });
    }

    // componentWillReceiveProps() {
    //     console.log("componentWillReceiveProps");
    // }
    //
    // shouldComponentUpdate() {
    //     console.log("shouldComponentUpdate");
    //     return true;
    // }
    //
    // componentWillUpdate() {
    //     console.log("componentWillUpdate");
    // }
    //
    // componentDidUpdate() {
    //     console.log("componentDidUpdate");
    // }
    //
    // componentWillUnmount() {
    //     console.log("componentWillUnmount");
    // }

    handlePassword(e) {
        this.setState({password: e.target.value});
        console.log("password=" + this.state.password);
    }

    handleName(e) {
        this.setState({name: e.target.value});
        console.log("name=" + this.state.name);
    }

    handleEmail(e) {
        this.setState({email: e.target.value});
        console.log("email=" + this.state.email);
    }

    handleSubmit(e) {
        var name = this.state.name;
        var password = this.state.password;
        var email = this.state.email;
        console.log("name=" + this.state.name);
        console.log("email=" + this.state.email);
        console.log("password=" + this.state.password);
        var q = {};
        q.name = name;
        q.password = password;
        q.email = email;
        user.update(q, function (rs) {
            alert(rs.data);
        })
    }

    render() {
        return (
            <form role="form" id="form">
                <div className="input_div">
                    <label className="input_left">Username</label>
                    <input type="text" disabled id="username" name="username" value={this.state.username}
                           className="form-control input_right"/>
                </div>
                <div className="input_div">
                    <label className="input_left">Password</label>
                    <input type="password" disabled id="password" name="password" value={this.state.password}
                           onChange={this.handlePassword} className="form-control input_right"/>
                </div>
                <div className="input_div">
                    <label className="input_left">Real Name</label>
                    <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleName}
                           className="form-control input_right"/>
                </div>
                <div className="input_div">
                    <label className="input_left">Email</label>
                    <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleEmail}
                           className="form-control input_right"/>
                </div>
                <button type="button" onClick={this.handleSubmit} className="btn btn-default">Submit</button>
                <button type="reset" className="btn btn-default">Reset</button>

                <input type="hidden" id="id" name="id"/>
            </form>
        )
    }


}

export default UserProfile