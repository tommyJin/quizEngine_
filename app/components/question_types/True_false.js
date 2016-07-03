/**
 * Created by tommy on 2016/6/30.
 */
import React, {Component} from 'react';

class True_false extends Component{
    constructor(props){
        super(props);
        // this.handleLogout = this.handleLogout.bind(this);
    }
    
    render(){
        return(
            <div className="question true_false">
                <div className="radio">
                    <label>
                        <input type="radio" name="true_false" value=""/>True
                    </label>
                </div>
                <div className="feedback_individual">
                    individual feedback here
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="true_false" value="false"/>False
                    </label>
                </div>
                <div className="feedback_individual">
                    individual feedback here
                </div>
            </div>
        )
    }
}

export default True_false