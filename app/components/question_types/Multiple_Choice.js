/**
 * Created by tommy on 2016/7/11.
 */
import React, {Component} from 'react';

class Multiple_Choice extends Component{
    constructor(props){
        super(props);
    }

    render(){
        var question = this.props.question;
        var answer = JSON.parse(question.answer);
        // console.log('this.props.answer=' + JSON.stringify(this.props.answer));
        // console.log('answer='+$.isEmptyObject(this.props.answer));
        var pre_answer = $.isEmptyObject(this.props.answer)?[]:JSON.parse(this.props.answer.answer);
        
        var _this = this;
        console.log('pre_answer=' + JSON.stringify(pre_answer));
        var choices = $.map(answer,function (o,index) {
            var checked = "";
            for (var i=0; i<pre_answer.length; i++){
                if(pre_answer[i].id==o.id){
                    if(pre_answer[i].checked){
                        checked = "checked";
                    }
                    break;
                }
            }
            console.log(o.id+' in pre_answer:'+checked);
            return (<div  key={question.id+"_"+o.id} className="multiple_choice">
                <input type={o.number==1?"radio":"checkbox"} name="choice" defaultChecked={checked} onClick={_this.props.handleSelect.bind(_this,o.id)}  />
                <div className="choice_content">{index+1}:{o.choice}</div><br className="clear"/></div>);
        });
        return(
            <div>
                {choices}
            </div>
        )
    }
}

export default Multiple_Choice