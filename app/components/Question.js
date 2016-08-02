/**
 * Created by tommy on 2016/6/30.
 */
import React, {Component} from 'react';
import quiz from '../api/quiz';
import util from '../util';
import cookie from 'react-cookie';

import True_False from './question_types/True_false';
import Fill_Blank from './question_types/Fill_Blank';
import Multiple_Choice from './question_types/Multiple_Choice';

class Question extends Component {

    constructor(props) {
        super(props);
        this.indexList = this.indexList.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            questions: '',

            question: '',
            answers:[],
            answer: [],
            mark: '',

            showanswer:2,

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

        quiz.getQuiz(self, q, function (rs) {
            //get quiz detail
            var data = rs.data;
            self.setState({
                showanswer: data.showanswer
            });
        });

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
        var answers = this.state.answers;
        var answer = {};
        for (var j=0; j<answers.length; j++){
            if (answers[j].quiz_question_id == questions[i-1].quiz_question_id){
                answer = answers[j].answer;
                break;
            }
        }
        this.setState({
            current: i,
            question: questions[i - 1],
            answer:answer,
            mark:0
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
            question: questions[next - 1],
            answer:'',
            mark:0
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
            question: questions[previous - 1],
            answer:'',
            mark:0
        })
    }

    handleSave(e) {
        var current = this.state.current;
        var question = this.state.questions[current-1];
        // console.log('all questions:'+JSON.stringify(this.state.questions));
        // console.log("current question in save = "+current+" "+JSON.stringify(question));
        var answers = this.state.answers;
        if (question != null) {
            var saved = this.state.saved;
            var self = this;
            var q = {};
            q.quiz_question_id = question.quiz_question_id;
            q.quiz_id = question.quiz_id;
            q.mark = this.state.mark;
            q.answer = JSON.stringify(this.state.answer);
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
                // console.log("q:" + JSON.stringify(q));
                // console.log("answers:" + JSON.stringify(answers));

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

                    var showanswer = self.state.showanswer;
                    if (showanswer==2){
                        self.setState({
                            showanswer:4
                        });
                    }
                })
            }
            
        }

    }

    handleFinish(e) {
        var self = this;
        var q = {};
        q.quiz_id = cookie.load('quiz_id');
        quiz.over(self, q, function (rs) {
            console.log("Your final mark=" + rs.data.mark);
            alert("Quiz finished.");
            self.setState({
                mark: rs.data.mark
            });
            util.goTo('view/quiz/get');
            return false;//prevent navigation to that link
        })
    }

    innerHtml(content) {
        return {__html: content};
    }

    handleChoose(value) {
        console.log("choose " + value);
        var question = this.state.question;
        var right_answer = ''+JSON.parse(question.answer).right+'';
        var mark = 0;
        if ( right_answer === (''+value+'') ) {
            mark = question.mark;
        }
        var answer = value;
        var answers = this.state.answers;
        console.log("answers in choose=" + answers);
        for (var i=0; i<answers.length; i++){
            if (answers[i].quiz_question_id == question.quiz_question_id){
                answers[i].answer = answer ;
                break;
            }
        }
        // console.log("final answer in choose=" + JSON.parse(answer));
        // console.log("final answers in choose=" + JSON.parse(answers));

        this.setState({
            answers:answers,
            answer: answer,
            mark: mark
        });
    }

    handleInput(id,e){
        // console.log("input id=" + id);
        // console.log("input value=" + e.target.value);
        var question = this.state.question; 
        var right_answer = JSON.parse(question.answer);
        var answers = this.state.answers;
        // console.log('answer in input ='+JSON.stringify(this.state.answer));
        var answer;
        if (this.state.answer instanceof Array){
            answer = this.state.answer;
        } else if (typeof this.state.answer === 'string'){
            answer = JSON.parse(this.state.answer);
        }
        // console.log('answer after ='+JSON.stringify(answer));

        var mark = 0;
        var p = {};
        p.id = id;
        p.answer = e.target.value;
        var flag = false;
        for (var i=0; i<answer.length; i++){
            if (answer[i].id==id){
                // console.log("find id=" + answer[i].id+" answer="+answer[i].answer);
                answer[i].answer = e.target.value;
                flag = true;
            }
            if (flag){
                break;
            }
        }
        if (!flag){
            // console.log("not find add a new");
            answer.push(p);
        }

        flag = true;
        for (var i=0; i<answer.length; i++){
            for (var j=0; j<right_answer.length; j++){
                // console.log(answer[i].id+" "+right_answer[j].id);
                // console.log(answer[i].id==right_answer[j].id);
                // console.log(answer[i].answer+" "+right_answer[j].answer);
                // console.log(answer[i].answer!=right_answer[j].answer);
                if(answer[i].id==right_answer[j].id && answer[i].answer!=right_answer[j].answer){
                    flag = false;
                    // console.log(answer[i].id+' = '+answer[i].answer+" not the right one:"+right_answer[j].answer);
                    break;// one blank is wrong
                }
            }
        }
        if(flag){//all right
            mark = question.mark;
        }
        // console.log('right answer:'+JSON.stringify(right_answer));
        // console.log('final answer:'+JSON.stringify(answer)+" and mark="+mark);

        for (var i=0; i<answers.length; i++){
            if (answers[i].quiz_question_id == question.quiz_question_id){
                answers[i].answer = answer ;
                break;
            }
        }
        // console.log("final answers:"+JSON.stringify(answers));
        this.setState({
            answers:answers,
            answer:answer,
            mark:mark
        })
    }
    
    handleSelect(id,e){
        console.log("choice id=" + id);
        console.log("choice checked=" + e.target.checked);
        var question = this.state.question;
        var right_answer = JSON.parse(question.answer);
        // console.log("right_answer detail:"+JSON.stringify(right_answer));
        var answer = this.state.answer.length==0?[]:this.state.answer;
        var p;
        if (answer.length==0){//first time click
            for (var i=0;i<right_answer.length;i++){
                p = {};
                p.id = right_answer[i].id;
                p.checked = false;
                answer.push(p);
            }
        }

        console.log("previous student answer detail:"+JSON.stringify(answer));
        var mark = 0;

        if(right_answer.length>0){//right answer exists
            if(right_answer[0].number==1){// 1 right answer
                answer = [];
                p = {};
                p.id = id;
                p.checked = e.target.checked;
                answer.push(p);
                for (i=0; i<right_answer.length; i++){
                    if( right_answer[i].id==id && right_answer[i].isRight ){
                        mark = question.mark;
                        break;
                    }
                }
            }else {//more than 1 right answer
                p = {};
                p.id = id;
                p.checked = e.target.checked;

                var flag = true;
                for ( i=0;i<answer.length; i++){
                    if (answer[i].id==id){
                        answer[i].checked = e.target.checked;
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    answer.push(p);
                }

                flag = true;
                for (i=0; i<answer.length; i++){
                    for (var j=0; j<right_answer.length; j++){
                        if(answer[i].id==right_answer[j].id && !(answer[i].checked == right_answer[j].isRight ) ){
                            // console.log(answer[i].id+" = "+answer[i].checked +" but right answer is = "+right_answer[j].isRight);
                            flag = false;
                            break;// one choice is wrong
                        }
                    }
                }
                if(flag){//all right
                    mark = question.mark;
                }else {
                    mark = 0;
                }
            }
            console.log('final answer:'+JSON.stringify(answer));
            console.log('final mark:'+mark);
            this.setState({
                answer:answer,
                mark:mark
            })
        }else {
            // console.log("right answer issue");
        }
    }


    render() {
        var question, _question = this.state.question, type = _question.question_type_id;
        var answers=this.state.answers;
        console.log('_question=' + JSON.stringify(_question));
        console.log('answers in render:'+JSON.stringify(answers));
        var answer = {};
        for (var i=0; i<answers.length; i++){
            if (answers[i].quiz_question_id == _question.quiz_question_id){
                answer = answers[i];
                break;
            }
        }
        console.log('answer in render:'+JSON.stringify(answer));

        // console.log('question type='+type);
        if ( type == 1){//fill blank
            question = <Fill_Blank question={_question} answer={answer} showanswer={this.state.showanswer} general_feedback={this.state.question.feedback} handleInput={this.handleInput}/>
        } else if (type == 2) {
            question = <Fill_Blank question={_question} answer={answer} showanswer={this.state.showanswer} general_feedback={this.state.question.feedback} handleInput={this.handleInput}/>
        } else if (type == 3) {
            question = <Multiple_Choice question={_question} answer={answer} showanswer={this.state.showanswer} general_feedback={this.state.question.feedback}  handleSelect={this.handleSelect}/>
        } else if (type == 4) {
            question = <Multiple_Choice question={_question} answer={answer} showanswer={this.state.showanswer} general_feedback={this.state.question.feedback} handleSelect={this.handleSelect}/>
        } else if (type == 5) {//true false
            question = <True_False question={_question} answer={answer} showanswer={this.state.showanswer} general_feedback={this.state.question.feedback} handleChoose={this.handleChoose}/>
        } else if (type == 6) {
            question = <Fill_Blank question={_question} answer={answer} showanswer={this.state.showanswer} general_feedback={this.state.question.feedback} handleInput={this.handleInput}/>
        } else {
            question = <div></div>
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
                    <div dangerouslySetInnerHTML={this.innerHtml(this.state.question.content)}/>
                </div>

                <div className="question_answer">
                    {question}
                </div>


              {/*  <div className={this.state.showanswer==4?"block":"hidden"}>
                    <div dangerouslySetInnerHTML={this.innerHtml("General feedback: "+this.state.question.feedback)}/>
                </div>*/}

                <div className="question_submit_button">
                    <button type="button" onClick={this.handleSave} className="btn btn-success">Save</button>
                </div>
            </div>
        )
    }

}
export default Question