/**
 * Created by tommy on 2016/7/11.
 */
import React, {Component} from 'react';

class Multiple_Choice extends Component {
    constructor(props) {
        super(props);
    }

    innerHtml(content) {
        return {__html: content};
    }

    render() {
        var question = this.props.question;
        var answer = JSON.parse(question.answer);
        // console.log('this.props.answer=' + JSON.stringify(this.props.answer));
        // console.log('answer='+$.isEmptyObject(this.props.answer));
        var pre_answer;
        if ($.isEmptyObject(this.props.answer)){
            pre_answer = [];
        }else if (typeof this.props.answer.answer === 'string'){
            pre_answer = JSON.parse(this.props.answer.answer);
        }else if ( this.props.answer.answer instanceof Array){
            pre_answer = this.props.answer.answer;
        }


        var showanswer = this.props.showanswer;
        var general_feedback = this.props.general_feedback;

        var _this = this;
        console.log('pre_answer=' + JSON.stringify(pre_answer));
        var choices = $.map(answer, function (o, index) {
            var checked = "";
            for (var i = 0; i < pre_answer.length; i++) {
                if (pre_answer[i].id == o.id) {
                    if (pre_answer[i].checked) {
                        checked = "checked";
                    }
                    if (showanswer==2){
                        showanswer = 4;
                    }
                    break;
                }
            }
            var key = question.id + "_" + o.id;
            // console.log(o.id + ' in pre_answer:' + checked);
            // console.log(' key:' + key);
            return (<div key={key} className="multiple_choice">
                <input type={o.number == 1 ? "radio" : "checkbox"} name="choice" defaultChecked={checked}
                       onClick={_this.props.handleSelect.bind(_this, o.id)}/>
                <div className="choice_content">{index + 1}:{o.choice}
                    <div className={showanswer==4?"block":"hidden"}>
                        <div dangerouslySetInnerHTML={_this.innerHtml("Individual feedback: "+o.feedback)}/>
                    </div>
                </div>
                <br className="clear"/>
            </div>);
        });
        return (
            <div>
                {choices}

                <div className={showanswer==4?"block":"hidden"}>
                    <div dangerouslySetInnerHTML={_this.innerHtml("General feedback: "+general_feedback)}/>
                </div>
            </div>
        )
    }
}

export default Multiple_Choice