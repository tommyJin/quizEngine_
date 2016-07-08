/**
 * Created by tommy on 2016/6/30.
 */
import React, {Component} from 'react';
import quiz from '../api/quiz';
import util from '../util';
import cookie from 'react-cookie';

import True_False from './question_types/True_false';

class Question extends Component {

    constructor(props) {
        super(props);
        this.indexList = this.indexList.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.state = {
            questions: '',

            question: '',
            answers:[],
            answer: '',
            mark: '',

            saved: [],
            current: '',
            size: ''
        };
    }

    componentDidMount() {
        console.log("componentDidMount");
        var self = this;
        var q = {};
        q.quiz_id = cookie.load('quiz_id');
        q.size = 1000;
        // console.log('quiz_id=' + q.quiz_id);
        quiz.getQuestions(self, q, function (rs) {
            // console.log('rs=' + JSON.stringify(rs));
            // console.log("first=" + JSON.stringify(rs.data.list[0]));
            self.setState({
                questions: rs.data.list,
                question: rs.data.list[0],
                current: 1,
                size: rs.data.totalRow
            });
        });
    }

    handleIndex(i) {
        // console.log('change index to '+i);
        var questions = this.state.questions;
        this.setState({
            current: i,
            question: questions[i - 1]
        });
    }

    indexList() {
        // console.log("index change");
        var current = this.state.current;
        var saved = this.state.saved;
        var size = this.state.size;
        // console.log("saved="+JSON.stringify(saved)+"  "+saved.indexOf(1));
        var indexs = [];
        for (var i = 1; i <= size; i++) {
            var className = "btn";
            if (i == current) {
                className += " current";
            }
            if (saved.indexOf(i) > -1) {
                className += " saved";
            }
            indexs.push(<button key={i} type="button" onClick={this.handleIndex.bind(this,i)}
                                className={className}>{i}</button>);
        }
        return indexs;
    }

    handleNext(e) {
        var questions = this.state.questions;
        var current = this.state.current;
        var size = this.state.size;
        var next = current;
        if ((current + 1) <= size) {
            next = current + 1;
        }
        this.setState({
            current: next,
            question: questions[next - 1]
        })

    }

    handlePrevious(e) {
        var questions = this.state.questions;
        var current = this.state.current;
        var previous = current;
        if ((current - 1) > 0) {
            previous = current - 1;
        }
        this.setState({
            current: previous,
            question: questions[previous - 1]
        })
    }

    handleSave(e) {
        var current = this.state.current;
        var question = this.state.questions[current];
        var answers = this.state.answers;
        if (question != null) {
            // console.log("quiz_question_id="+quiz_question_id+" saved");
            var saved = this.state.saved;
            var self = this;
            var q = {};
            q.quiz_question_id = question.id;
            q.quiz_id = question.quiz_id;
            q.mark = this.state.mark;
            q.answer = this.state.answer;
            if(q.answer==null || q.answer.length==0){
                alert("Please answer the question first!");
            }else {
                if (saved.indexOf(current) >= 0) {
                    for (var i =0; i<answers.length;i++){
                        if (answers[i].quiz_question_id==question.id){
                            q.quiz_record_id = answers[i].id;
                            break;
                        }
                    }
                }
                console.log("q:" + JSON.stringify(q));
                console.log("answers:" + JSON.stringify(answers));

                quiz.saveAnswer(self, q, function (rs) {
                    if (saved.indexOf(current) < 0) {
                        saved.push(current);
                        answers.push(rs.data);
                    }else {
                        for (var i =0; i<answers.length;i++){
                            if (answers[i].quiz_question_id==question.id){
                                answers[i] = rs.data;
                                break;
                            }
                        }
                    }

                    self.setState({
                        saved: saved,
                        answers:answers
                    });
                })
            }
            
        }

    }

    handleFinish(e) {
        var self = this;
        var q = {};
        q.quiz_id = cookie.load('quiz_id');
        quiz.finish(self, q, function (rs) {
            console.log("final mark=" + rs.data.mark);
            self.setState({
                mark: rs.data.mark
            })
        })
    }

    innerHtml() {
        return {__html: this.state.question.content};
    }

    handleChoose(value) {
        console.log("choose " + value);
        var question = this.state.question;
        var right_answer = ''+JSON.parse(question.answer).right+'';
        var mark = 0;
        if ( right_answer === (''+value+'') ) {
            mark = question.mark;
        }
        this.setState({
            answer: value,
            mark: mark
        });
    }


    render() {
        var question, _question = this.state.question, type = _question.question_type_id;
        console.log('_question=' + JSON.stringify(_question));
        if (type == 5) {
            question = <True_False question={_question} handleChoose={this.handleChoose}/>
        } else if (type == 6) {


        } else {
            question = <div>sss</div>
        }

        return (
            <div className="question_body">
                <div className="question_index">
                    {this.indexList()}
                </div>
                <div className="header">
                    <button type="button" onClick={this.handleFinish} className="btn btn-success">Finish</button>
                    <button type="button" onClick={this.handlePrevious} className="btn btn-info">Previous</button>
                    <button type="button" onClick={this.handleNext} className="btn btn-primary">Next</button>
                </div>
                <br className="clear"/>
                <hr/>
                <div className="question_content">
                    <div dangerouslySetInnerHTML={this.innerHtml()}/>
                </div>

                <div className="question_answer">
                    {question}
                </div>

                <div className="feedback_general">
                    {this.state.question.feedback}
                </div>

                <div className="question_submit_button">
                    <button type="button" onClick={this.handleSave} className="btn btn-success">Save</button>
                </div>
            </div>
        )
    }

}
export default Question