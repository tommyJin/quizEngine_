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
            module_name: '',
            level_name: '',
            user_name: '',
            total_mark: '',
            mark: '',

            showanswer:3,

            quiz: '',
            questions: [],
            list: ''
        };
    }

    innerHtml(content) {
        return {__html: content};
    }

    componentDidMount() {
        console.log('componentDidMount');
        var quiz_id = cookie.load('quiz_id');
        console.log("quiz_id in cookie = " + quiz_id);
        var self = this;
        var q = {};
        q.quiz_id = quiz_id;
        q.size = 10000;

        quiz.getQuiz(self, q, function (rs) {
            //get quiz detail
            var data = rs.data;
            self.setState({
                module_name: data.category_name,
                level_name: data.level_name == null ? "All levels" : data.level_name,
                user_name: data.user_name,
                total_mark: data.total_mark,
                mark: data.mark,
                showanswer:data.showanswer
            });
        });

        quiz.getRecords(self, q, function (rs) {
            //get quiz records detail
            var data = rs.data;
            var count = 0;
            // console.log("data:" + JSON.stringify(data));
            var list = $.map(data, function (o, index) {
                var right_answer = JSON.parse(o.right_answer);
                var user_answer;
                var answer = "";//student answers
                if (o.user_answer !=null && o.user_answer.length>0){
                    user_answer = JSON.parse(o.user_answer);
                }else {
                    answer = null;
                }
                var type = o.question_type_id;
                var question_id = o.question_id;
                var indexes = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T"];
                var choice;//choice html
                var choices = [];//each choice object of question
                if ( type == 1 || type == 2 || type ==6) {//Fill in the Blank
                    choice = $.map(right_answer,function (j,index) {
                        var key = "blank_"+question_id+"_"+index;
                        return(
                            <div key={key}>
                                <div className="question_choice">
                                    <span>{j.id}: {j.answer}</span>
                                </div>
                                <div className="question_feedback">
                                    <div className={self.state.showanswer==1?"hidden":"block"} dangerouslySetInnerHTML={self.innerHtml("Individual feedback: "+j.feedback)}/>
                                </div>
                            </div>
                        );
                    });
                    if (answer!=null){
                        answer = $.map(user_answer, function (j,index) {
                            var key = "blank_answer_"+question_id+"_"+index;
                            return(
                                <p key={key}>{j.id}: {j.answer}</p>
                            );
                        });
                    }
                } else if (type == 3 || type ==4) {//Multiple Choice
                    choice = $.map(right_answer,function (j,index) {
                        var color = j.isRight?"green":"red";
                        var key = "multiple_"+question_id+"_"+index;
                        var q = {};
                        q.id = j.id;
                        q.index = indexes[index];
                        choices.push(q);
                        return(
                            <div key={key}>
                                <div className="question_choice">
                                    <span className={color}> <div dangerouslySetInnerHTML={self.innerHtml(indexes[index]+". "+j.choice)}/></span>
                                </div>
                                <div className="question_feedback">
                                    <div className={self.state.showanswer==1?"hidden":"block"}  dangerouslySetInnerHTML={self.innerHtml("Individual feedback: "+j.feedback)}/>
                                </div>
                            </div>
                        );
                    });
                    // console.log("choices:"+JSON.stringify(choices));
                    if (answer!=null){
                        $.map(user_answer,function (j) {
                            for (var t=0; t<choices.length;t++){
                                if (choices[t].id == j.id && ( (j.checked+"")=="true")){
                                    answer += choices[t].index+",";//find the selected one, add it to the string
                                }
                            }
                        });
                        // console.log("final answer = "+answer);
                        if (answer.length>0 && answer.substr(answer.length-1,answer.length)==","){
                            answer = answer.substr(0,answer.length-1);
                        }
                    }
                } else if (type == 5) {//true false
                    var true_color = (right_answer.right+""=="true")?"green":"red";
                    var false_color = (right_answer.right+""=="false")?"green":"red";
                    choice = (
                        <div>
                            <p className={true_color}>
                                Agree.{right_answer.true_content}
                            </p>
                            <p>
                                <div className={self.state.showanswer==1?"hidden":"block"} dangerouslySetInnerHTML={self.innerHtml("Individual feedback: "+right_answer.feedback_true)}/>
                            </p>
                            <p className={false_color}>
                                Disagree. {right_answer.false_content}
                            </p>
                            <p>
                                <div className={self.state.showanswer==1?"hidden":"block"} dangerouslySetInnerHTML={self.innerHtml("Individual feedback: "+right_answer.feedback_false)}/>
                            </p>
                        </div>
                    );
                    if (answer!=null){
                        answer += user_answer+""=="true"?"Agree":"Disagree";
                    }
                } else {
                }
                if(answer==null){
                    answer = "You did not answer this question.";
                }

                var bgc = "quiz_one_question_content "+ (count%2==0?"grey":"dark");
                count++;
                return (
                    <div key={index} className="quiz_one_question">
                        <div className="quiz_one_question_index">Q {index + 1}.</div>
                        <div className={bgc}>
                            <div className="quiz_one_question_title">
                                <div dangerouslySetInnerHTML={self.innerHtml(o.content)}/>
                                </div>
                            <div className="quiz_one_question_right_answer">
                                {choice}
                            </div>
                            <div>
                                <p className="question_metadata">
                                    <span>Level:{o.level_name}</span>
                                    <span>Score:{o.mark}</span>
                                    <span>You got:{o.user_mark==null?0:o.user_mark}</span>
                                </p>
                                <div className="clear"/>
                                <p className="question_metadata">
                                    <div className={self.state.showanswer==1?"hidden":"block"} dangerouslySetInnerHTML={self.innerHtml("General Feedback:"+o.general_feedback)}/>
                                </p>
                                <div className="clear"/>
                            </div>
                            <div>
                                Your answer:{answer}
                            </div>
                        </div>
                    </div>
                );
            });
            // console.log("list:" + JSON.stringify(list));
            self.setState({
                questions: list
            });
        });
    }


    render() {

        return (
            <div className="quiz_one">
                <div className="quiz_one_header">
                    <span>
                        Module: <b>{this.state.module_name}</b>
                    </span>
                    <span>
                        Level: <b>{this.state.level_name}</b>
                    </span>
                    <span>
                        Student: <b>{this.state.user_name}</b>
                    </span>
                    <span>
                        Total Score: <b>{this.state.total_mark} </b>
                    </span>
                    <span>
                        You got: <b>{this.state.mark}</b>
                    </span>
                </div>
                <div className="clear"/>
                <div className="quiz_one_questions">
                    {this.state.questions}
                </div>
            </div>
        )
    }
}


export default QuizOne