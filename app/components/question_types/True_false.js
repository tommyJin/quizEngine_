/**
 * Created by tommy on 2016/6/30.
 */
import React, {Component} from 'react';

class True_false extends Component{
    constructor(props){
        super(props);
    }

    handleChoose(value){
        return value;
    }
    
    render(){
        var question = this.props.question;
        var answer = JSON.parse(question.answer);
        return(
            <div className="question true_false">
                <div className="radio">
                    <label>
                        <input type="radio" name="true_false" value="true" onClick={this.props.handleChoose.bind(this,true)}/>{answer.true_content}
                    </label>
                </div>
                <div className="feedback_individual">
                    {answer.feedback_true}
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="true_false" value="false" onClick={this.props.handleChoose.bind(this,false)}/>{answer.false_content}
                    </label>
                </div>
                <div className="feedback_individual">
                    {answer.feedback_false}
                </div>
            </div>
        )
    }
}

export default True_false