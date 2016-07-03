/**
 * Created by tommy on 02/07/2016.
 */
import React, {Component} from 'react';

class Question_index extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        var current = this.props.current;
        var saved = this.props.saved;
        var size = this.props.size;

        var list = [];
        for (var i=1;i<=size;i++){
            var className ="btn";
            if (i==current){
                className += " current";
            }
            if (saved.indexOf(i) > -1){
                className += " saved";
            }
            list.push(<button type="button" onClick={this.props.handleIndex} className={className}>{i}</button>);
        }
        return(
            <div className="question_index">
                {list}
            </div>
        )
    }
}

export default Question_index