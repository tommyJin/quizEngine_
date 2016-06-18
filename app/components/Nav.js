/**
 * Created by tommy on 2016/6/18.
 */
import React, {Component} from 'react';
import user from '../api/user';

class Nav extends Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    handleLogout(){
        user.logout("",function (rs) {
            alert(rs.data);
        })
    }
    
    render(){
        return(
            <div>
                <div className="navbar-header">
                    <a href="#" className="navbar-brand">Student Client</a>
                    <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div className="navbar-collapse collapse" id="navbar-main">
                    <ul className="nav navbar-nav">
                        <li>
                            <a href="#">QUIZ</a>
                        </li>
                        <li>
                            <a href="#">PROFILE</a>
                        </li>
                        <li>
                            <a href="user/setting">SETTING</a>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="user" >Welcome: student</a></li>
                        <li><a href="" onClick={this.handleLogout} class="btn btn-info">Logout</a></li>
                    </ul>

                </div>
            </div>
        )
    }
}

export default Nav