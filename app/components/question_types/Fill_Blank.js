/**
 * Created by tommy on 2016/7/11.
 */
import React, {Component} from 'react';

class Fill_Blank extends Component{
    constructor(props){
        super(props);
        this.state= {
            blanks:[]
        }
    }

    render(){
        var question = this.props.question;
        var answer = JSON.parse(question.answer);
        var _this = this;
        // console.log('there are '+answer.length+" blank(s)");

        var blanks = $.map(answer,function (o,index) {
           return (<div key={index} className="blank_input"><span>{o.id}:</span><input type="text" className="form-control" onChange={_this.props.handleInput.bind(_this,o.id)} /></div>);
        });
        return(
            <div className="question fill_blank">
                {blanks}
            </div>
        )
    }
}

export default Fill_Blank