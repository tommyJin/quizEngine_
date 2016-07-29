/**
 * Created by tommy on 2016/7/28.
 */
import React, {Component} from 'react';
import quiz from '../api/quiz';
import util from '../util';
import cookie from 'react-cookie';

class QuizOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz:'',
            questions: '',
            list:''
        };
    }

    componentDidMount() {
        console.log('componentDidMount');
        var quiz_id = cookie.load('quiz_id');
        console.log("quiz_id in cookie = "+quiz_id);
        var self = this;
        var q = {};
        q.quiz_id = quiz_id;
        q.size = 1000;
        quiz.getQuestions(self,q, function (rs) {
            var list = [];
            $.map(rs.data.list,function (o,index) {
               return(
                 <div>

                 </div>
               );
            });

            self.setState({
                questions: rs.data.list
            });
        });
    }



    render() {

        return (
            <div>
                <div>
                    {this.state.questions}
                </div>
            </div>
        )
    }
}


export default QuizOne