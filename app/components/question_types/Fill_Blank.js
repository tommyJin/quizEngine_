/**
 * Created by tommy on 2016/7/11.
 */
import React, {Component} from 'react';

class Fill_Blank extends Component {
    constructor(props) {
        super(props);
    }

    innerHtml(content) {
        return {__html: content};
    }

    render() {
        var question = this.props.question;
        var answer = JSON.parse(question.answer);
        var showanswer = this.props.showanswer;
        var isSaved = this.props.isSaved;
        var pre_answer = $.isEmptyObject(this.props.answer)?[]:this.props.answer.answer;

        if (this.props.answer.answer instanceof Array){
            pre_answer = this.props.answer.answer;
        } else if (typeof this.props.answer.answer === 'string'){
            pre_answer = JSON.parse(this.props.answer.answer);
        }

        var _this = this;
        var general_feedback = this.props.general_feedback;
        // console.log('right answer='+JSON.stringify(answer));
        // console.log('pre_answer=' + JSON.stringify(pre_answer));
        // console.log("isSaved = "+isSaved);
        // console.log("showanswer = "+showanswer);

        var blanks = $.map(answer, function (o, index) {
            // console.log("answer the "+index+", showanswer="+showanswer);
            var blank = "";
            var tmp_showanswer = 2;
            if (isSaved==2){
                for (var i = 0; i < pre_answer.length; i++) {
                    if (pre_answer[i].id == o.id) {
                        blank = pre_answer[i].answer;
                        if (showanswer==2 || showanswer==4){
                            tmp_showanswer = 4;
                        }
                        break;
                    }
                }
                showanswer = 4;
            }

            // console.log("tmp_showanswer="+tmp_showanswer+". showanswer="+showanswer);
            return (
                <div key={question.id+"_"+o.id} className="fill_blank">
                    <span>{o.id}:</span><input type="text" className="form-control" defaultValue={blank} onChange={_this.props.handleInput.bind(_this,o.id)}/>
                    <div className={tmp_showanswer==4?"block":"hidden"}>
                        <div dangerouslySetInnerHTML={_this.innerHtml("Individual feedback: "+o.feedback)}/>
                    </div>
                </div>);
        });
        return (
            <div>
                {blanks}

                <div className={showanswer==4?"block":"hidden"}>
                    <div dangerouslySetInnerHTML={this.innerHtml("General feedback: "+general_feedback)}/>
                </div>
            </div>
        )
    }
}

export default Fill_Blank