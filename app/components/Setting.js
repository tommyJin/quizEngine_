/**
 * Created by tommy on 2016/6/23.
 */
import React, {Component} from 'react';
import quiz from '../api/quiz';
import category from '../api/question_category';
import topic from '../api/question_topic';
import level from '../api/question_level';
import util from '../util';
import cookie from 'react-cookie';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategories = this.handleCategories.bind(this);
        this.handleTopics = this.handleTopics.bind(this);
        this.handleLevels = this.handleLevels.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleAnswered = this.handleAnswered.bind(this);
        this.handleShowAnswer = this.handleShowAnswer.bind(this);
        this.handleGoTo = this.handleGoTo.bind(this);
        this.state = {
            categories: '',
            levels: '',
            name: 'All Categories All Levels',
            category_id: '',
            category_name: 'All Categories',
            level_id: '',
            level_name: 'All Levels',
            number: 5,
            maxSize: 0,
            goToCss: 'none',
            quiz_id: '',
            answered: '2',
            showanswer: '3',
            topics: '',
            topic_id: ''
        };
    }

    componentDidMount() {
        console.log("componentDidMount start");
        var self = this;
        var first_id = 0;
        category.categories(self, function (rs) {
            var data = rs.data;
            console.log('category.data = ', JSON.stringify(data));
            var categories = $.map(data, function (o, index) {
                if (index==0){
                    first_id = o.id;
                }
                return (<option key={index} value={o.id}>{o.name}</option>);
            });
            categories.unshift(<option key="select_module" value="0">Select Module</option>);
            console.log("first category_id="+first_id);
            self.setState({
                categories: categories
                // , category_id:first_id
            });
        });
        level.levels(self, function (rs) {
            var data = rs.data;
            var levels = $.map(data, function (o, index) {
                return (<option key={index} value={o.id}>{o.name}</option>);
            });
            levels.unshift(<option key="" value="">All Levels</option>);
            self.setState({
                levels: levels
            });
        });

        var q = {};
        q.category_id = first_id;
        q.topic_id = this.state.topic_id;
        q.level_id = this.state.level_id;
        q.answered = this.state.answered;
        quiz.maxSize(self, q, function (rs) {
            var size = rs.data;
            self.setState({
                maxSize: size
            });
        });
        console.log("componentDidMount end");
    }

    handleCategories(e) {
        console.log("handleCategories start");

        if(e.target.value!=0){
            this.setState({
                category_id: e.target.value,
                category_name: e.target.options[e.target.selectedIndex].text
            });
            this.setState({
                name: e.target.options[e.target.selectedIndex].text + " " + this.state.level_name
            });
            var self = this;

            var q = {};
            q.category_id = e.target.value;
            topic.topics(self, q, function (rs) {
                var data = rs.data;
                var topics = $.map(data, function (o, index) {
                    return (<label key={o.id+"_"+index} className="checkbox-inline"><input type="checkbox" onChange={self.handleTopics} value={o.id}/>{o.name}
                    </label>);
                });
                self.setState({
                    topics: topics
                });
            });

            console.log("get max size");
            q.topic_id = this.state.topic_id;
            q.level_id = this.state.level_id;
            q.answered = this.state.answered;
            quiz.maxSize(self, q, function (rs) {
                var size = rs.data;
                console.log("size=" + size);
                self.setState({
                    maxSize: size
                });
            });
        }

    }

    handleTopics(e) {
        console.log("handleTopics");
        // console.log('pick topic:' + e.target.value +" checked="+e.target.checked);
        var checked_topic_id = '' + e.target.value + '';
        var topic_id = [];
        // console.log("state topic_id="+this.state.topic_id);
        if (this.state.topic_id!=null && this.state.topic_id!="" && this.state.topic_id.length>0){
            var tmp =  this.state.topic_id;
            topic_id = tmp.split(",");
        }
        // console.log("topic_id="+JSON.stringify(topic_id));
        var index = topic_id.indexOf(checked_topic_id);
        // console.log("index="+index);
        if (index > -1) {
            if(!e.target.checked ){
                topic_id.splice(index,1);//remove the index one
                // console.log("remove "+index+" "+topic_id[index]);
            }
        } else {
            if(e.target.checked ){
                // console.log("add into topic_id "+checked_topic_id);
                topic_id.push(checked_topic_id);
            }
        }
        this.setState({
            topic_id: topic_id.toString()
        });

        console.log("get max size");
        var q = {};
        q.category_id = this.state.category_id;
        q.topic_id = topic_id.toString();
        q.level_id = this.state.level_id;
        q.answered = this.state.answered;
        console.log("q:"+JSON.stringify(q));
        var self = this;
        quiz.maxSize(self, q, function (rs) {
            var size = rs.data;
            console.log("size=" + size);
            self.setState({
                maxSize: size
            });
        });
    }

    handleLevels(e) {
        console.log("handleLevels");
        console.log("select level="+e.target.value);
        this.setState({
            level_id: e.target.value,
            level_name: e.target.options[e.target.selectedIndex].text
        });
        this.setState({
            name: this.state.category_name + " " + e.target.options[e.target.selectedIndex].text
        });
        var self = this;
        console.log("get max size");
        var q = {};
        q.category_id = this.state.category_id;
        q.topic_id = this.state.topic_id;
        q.level_id = e.target.value;
        q.answered = this.state.answered;
        quiz.maxSize(self, q, function (rs) {
            var size = rs.data;
            console.log("size=" + size);
            self.setState({
                maxSize: size
            });
        });
    }

    handleNumber(e) {
        console.log("handleNumber");
        console.log("input number="+e.target.value);

        var value = e.target.value;
        if (value > 0) {
            var size = this.state.maxSize;
            if (value > size) {
                alert("The largest number of questions is " + size + ", you can not set more than " + size);
            } else {
                this.setState({
                    number: e.target.value
                })
            }
        } else {
            alert("The number must be greater than 0!");
        }
    }

    handleGoTo() {
        var id = this.state.quiz_id;
        util.goTo('view/quiz/question');
        return false;//prevent navigation to that link
    }

    handleAnswered(e) {
        console.log("handleAnswered");
        console.log("pick="+e.target.value);
        this.setState({
            answered: e.target.value
        });
        var self = this;
        console.log("get max size");
        var q = {};
        q.category_id = this.state.category_id;
        q.topic_id = this.state.topic_id;
        q.level_id = this.state.level_id;
        q.answered = e.target.value;
        quiz.maxSize(self, q, function (rs) {
            var size = rs.data;
            console.log("size=" + size);
            self.setState({
                maxSize: size
            });
        });
    }

    handleShowAnswer(e) {
        console.log("handleShowAnswer");
        console.log("pick="+e.target.value);
        this.setState({
            showanswer: e.target.value
        });
    }

    handleSubmit(e) {
        console.log("handleSubmit");
        var q = {};
        q.name = this.state.name;
        q.category_id = this.state.category_id;
        q.level_id = this.state.level_id;
        q.topic_id = this.state.topic_id;
        q.number = this.state.number;
        q.answered = this.state.answered;//1->remove  2->dont remove
        q.showanswer = this.state.showanswer;//1->dont show  2->show after each question  3->show after quiz
        if (q.category_id.length <= 0) {
            alert("You should select one module");
        } else {
            if (q.topic_id.length <= 0) {
                alert("You should select one topic");
            } else {
                if (this.state.maxSize < this.state.number) {
                    alert("You can not set the number of questions greater than the max size!");
                } else {
                    var self = this;
                    quiz.addQuiz(self, q, function (rs) {
                        console.log('submit rs=%j', rs);
                        if (rs.status == 200) {
                            alert("Generate quiz success!");
                            self.setState({
                                quiz_id: rs.data.id,
                                goToCss: ''
                            });
                            cookie.save('quiz_id', rs.data.id, {path: '/'});
                            console.log('quiz_id in cookie = ' + cookie.load('quiz_id'));
                        } else {
                            alert("Generate quiz failed!");
                        }
                    });
                }
            }
        }

    }

    render() {
        return (
            <form role="form" id="form">
                <div className="input_div">
                    <label className="input_left">Module</label>
                    <select className="form-control input_right" onChange={this.handleCategories}>
                        {this.state.categories}
                    </select>
                </div>
                <div className="input_div">
                    <label className="input_left">Topic</label>
                    {this.state.topics}
                </div>
                <div className="input_div">
                    <label className="input_left">Level</label>
                    <select className="form-control input_right" onChange={this.handleLevels}>
                        {this.state.levels}
                    </select>
                </div>
                <div className="input_div">
                    <label className="input_left">Name</label>
                    <input type="text" disabled className="form-control input_right" value={this.state.name}/>
                </div>
                <div className="input_div">
                    <label className="input_left">Number</label>
                    <input type="number" onChange={this.handleNumber} className="form-control input_right"
                           value={this.state.number}/>
                    <p>Available:{this.state.maxSize}</p>
                </div>
                <div className="input_div">
                    <label className="input_left">Remove answered questions?</label>
                    <label className="radio-inline">
                        <input key="answered_1" type="radio" name="answered" value="1" checked={this.state.answered == 1}
                               onChange={this.handleAnswered}/>Remove
                    </label>
                    <label className="radio-inline">
                        <input key="answered_2"  type="radio" name="answered" value="2" checked={this.state.answered == 2}
                               onChange={this.handleAnswered}/>Don't remove
                    </label>
                </div>
                <div className="input_div">
                    <label className="input_left">Show answers when?</label>
                    <label className="radio-inline">
                        <input key="showanswer_1" type="radio" name="showanswer" value="1" checked={this.state.showanswer == 1}
                               onChange={this.handleShowAnswer}/>Don't show
                    </label>
                    <label className="radio-inline">
                        <input key="showanswer_2" type="radio" name="showanswer" value="2" checked={this.state.showanswer == 2}
                               onChange={this.handleShowAnswer}/>After each question
                    </label>
                    <label className="radio-inline">
                        <input key="showanswer_3" type="radio" name="showanswer" value="3" checked={this.state.showanswer == 3}
                               onChange={this.handleShowAnswer}/>After quiz
                    </label>
                </div>
                <button type="button" onClick={this.handleSubmit} className="btn btn-default">Submit</button>
                <button type="reset" className="btn btn-default">Reset</button>
                <button type="button" style={{display: this.state.goToCss}} onClick={this.handleGoTo}
                        className="btn btn-success">Take the quiz now!
                </button>
                <input type="hidden" id="id" name="id"/>
            </form>
        )
    }
}

export default Setting