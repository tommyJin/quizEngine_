/**
 * Created by tommy on 2016/7/11.
 */
import React, {Component} from 'react';

class Fill_Blank extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var question = this.props.question;
        var answer = JSON.parse(question.answer);
        var pre_answer = $.isEmptyObject(this.props.answer)?[]:JSON.parse(this.props.answer.answer);
        var _this = this;
        console.log('pre_answer=' + JSON.stringify(pre_answer));

        var blanks = $.map(answer, function (o, index) {
            var blank = "";
            for (var i = 0; i < pre_answer.length; i++) {
                if (pre_answer[i].id == o.id) {
                    blank = pre_answer[i].answer;
                    break;
                }
            }
            return (
                <div key={question.id+"_"+o.id} className="fill_blank"><span>{o.id}:</span><input type="text" className="form-control" defaultValue={blank}
                                                                                   onChange={_this.props.handleInput.bind(_this,o.id)}/>
                </div>);
        });
        return (
            <div>
                {blanks}
            </div>
        )
    }
}

export default Fill_Blank