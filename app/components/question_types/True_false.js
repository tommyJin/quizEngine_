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

    innerHtml(content) {
        return {__html: content};
    }
    
    render(){
        var question = this.props.question;
        var answer = JSON.parse(question.answer);
        var pre_answer = this.props.answer;
        // console.log('pre_answer='+JSON.stringify(pre_answer));
        var showanswer = pre_answer.answer!=null?4:2;
        var general_feedback = this.props.general_feedback;

        return(
            <div className="question true_false">
                <div className="radio">
                    <label>
                        <input type="radio" name="true_false" value="true" defaultChecked={pre_answer.answer=="true"?"checked":""} onClick={this.props.handleChoose.bind(this,true)}/>{answer.true_content}
                    </label>
                </div>
                <div className={showanswer==4?"block":"hidden"}>
                    <div dangerouslySetInnerHTML={this.innerHtml("Individual feedback: "+answer.feedback_true)}/>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="true_false" value="false" defaultChecked={pre_answer.answer=="false"?"checked":""} onClick={this.props.handleChoose.bind(this,false)}/>{answer.false_content}
                    </label>
                </div>
                <div className={showanswer==4?"block":"hidden"}>
                    <div dangerouslySetInnerHTML={this.innerHtml("Individual feedback: "+answer.feedback_false)}/>
                </div>

                <div className={showanswer==4?"block":"hidden"}>
                    <div dangerouslySetInnerHTML={this.innerHtml("General feedback: "+general_feedback)}/>
                </div>
            </div>
        )
    }
}

export default True_false