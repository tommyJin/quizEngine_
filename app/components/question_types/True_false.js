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
        var pre_ans = pre_answer.answer;
        var isSaved = this.props.isSaved;
        console.log("props isSaved="+isSaved);
        // console.log('pre_answer='+pre_answer);
        // console.log('pre_answer answer='+pre_answer.answer);
        var right_answer = "";
        if (typeof pre_ans === 'boolean'){
            if (pre_ans){
                pre_ans = "true";
            }else {
                pre_ans = "false";
            }
        }else if (typeof pre_ans === 'object'){
            if (pre_ans){
                pre_ans = "true";
            }else {
                pre_ans = "false";
            }
        }


        // console.log("1 true checked="+ (pre_ans=="true" ));
        // console.log("2 true checked="+ (pre_ans==="true" ));
        // console.log("1 false checked="+ (pre_ans=="false" ));
        // console.log("2 false checked="+ (pre_ans==="false" ));
        var showanswer = this.props.showanswer;
        console.log("props showanswer="+showanswer);
        showanswer = showanswer==4?2:showanswer;
        console.log("after showanswer="+showanswer);
        if (showanswer==2 && isSaved ==2){
            showanswer = pre_answer.answer!=null?4:2;
        }

        console.log("showanswer in true false="+showanswer);

        var general_feedback = this.props.general_feedback;
        var key = "true_false_"+question.id;
        console.log("before return showanswer="+showanswer);
        return(
            <div key={key} className="question true_false">
                <div className="radio">
                    <label>
                        <input type="radio" name="true_false" value="true" defaultChecked={pre_ans=="true"?"checked":""} onClick={this.props.handleChoose.bind(this,true)}/>true:{answer.true_content}
                    </label>
                </div>
                <div className={ (showanswer==4 && isSaved==2 && pre_ans=="true") ?"block":"hidden"}>
                    <div dangerouslySetInnerHTML={this.innerHtml("Individual feedback: "+answer.feedback_true)}/>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="true_false" value="false" defaultChecked={pre_ans=="false"?"checked":""} onClick={this.props.handleChoose.bind(this,false)}/>false:{answer.false_content}
                    </label>
                </div>
                <div className={(showanswer==4 && isSaved==2 && pre_ans=="false")?"block":"hidden"}>
                    <div dangerouslySetInnerHTML={this.innerHtml("Individual feedback: "+answer.feedback_false)}/>
                </div>

                <div className={showanswer==4  && isSaved==2?"block":"hidden"}>
                    <div className="green">Right answer:{answer.right}</div>
                    <div dangerouslySetInnerHTML={this.innerHtml("General feedback: "+general_feedback)}/>
                </div>
            </div>
        )
    }
}

export default True_false