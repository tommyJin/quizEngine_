/**
 * Created by tommy on 2016/6/23.
 */
import React, {Component} from 'react';
import quiz from '../api/quiz';
import category from '../api/question_category';
import level from '../api/question_level';
import util from '../util';
import cookie from 'react-cookie';

class Setting extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategories = this.handleCategories.bind(this);
        this.handleLevels = this.handleLevels.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        this.handleGoTo = this.handleGoTo.bind(this);
        this.state = {
            categories: '',
            levels:'',
            name:'All Categories All Levels',
            category_id:'',
            category_name:'All Categories',
            level_id:'',
            level_name:'All Levels',
            number:5,
            maxSize:0,
            goToCss:'none',
            quiz_id:'',
            answered:'2'
        };
    }

    componentDidMount(){
        var self = this;
        category.categories(self,function (rs) {
            var data = rs.data;
            console.log('category.data = %j',data);
            var categories = $.map(data,function (o,index) {
                return(<option key={index} value={o.id}>{o.name}</option>);
            });
            categories.unshift(<option key="" value="">All Categories</option>);
            self.setState({
                categories:categories
            });
        });
        level.levels(self,function (rs) {
            var data = rs.data;
            var levels = $.map(data,function (o,index) {
                return(<option key={index} value={o.id}>{o.name}</option>);
            });
            levels.unshift(<option key="" value="">All Levels</option>);
            self.setState({
                levels:levels
            });
        });
        var q = {};
        q.level_id = this.state.level_id;
        q.category_id = this.state.category_id;
        quiz.maxSize(self,q,function (rs) {
            var size = rs.data;
            self.setState({
                maxSize:size
            });
        });
    }
    
    handleCategories(e){
        this.setState({
            category_id : e.target.value, 
            category_name: e.target.options[e.target.selectedIndex].text
        });
        this.setState({
            name : e.target.options[e.target.selectedIndex].text + " "+ this.state.level_name
        });
        var self = this;
        var q = {};
        q.level_id = this.state.level_id;
        q.category_id = e.target.value;
        console.log("get size");
        q.answered = this.state.answered;
        quiz.maxSize(self, q,function (rs) {
            var size = rs.data;
            console.log("size="+size);
            self.setState({
                maxSize:size
            });
        });
    }

    handleLevels(e){
        this.setState({
            level_id : e.target.value,
            level_name:e.target.options[e.target.selectedIndex].text
        });
        this.setState({
            name : this.state.category_name + " "+ e.target.options[e.target.selectedIndex].text
        });
        var self = this;
        console.log("get size");
        var q = {};
        q.level_id = e.target.value;
        q.category_id = this.state.category_id;
        q.answered = this.state.answered;
        quiz.maxSize(self,q,function (rs) {
            var size = rs.data;
            console.log("size="+size);
            self.setState({
                maxSize:size
            });
        });
    }

    handleNumber(e){
        var value = e.target.value;
        if (value>0){
            var size = this.state.maxSize;
            if(value>size){
                alert("The largest number of questions is "+size+", you can not set more than "+size);
            }else {
                this.setState({
                    number : e.target.value
                })
            }
        }else {
            alert("The number must be greater than 0!");
        }
    }

    handleGoTo() {
        var id = this.state.quiz_id;
        util.goTo('view/quiz/question');
        return false;//prevent navigation to that link
    }
    
    handleRadio(e){
        this.setState({
            answered:e.target.value
        });
        var self = this;
        // console.log("get size");
        var q = {};
        q.level_id = this.state.level_id;
        q.category_id = this.state.category_id;
        q.answered = e.target.value;
        quiz.maxSize(self,q,function (rs) {
            var size = rs.data;
            console.log("size="+size);
            self.setState({
                maxSize:size
            });
        });
    }
    
    handleSubmit(e){
        var q = {};
        q.name = this.state.name;
        q.category_id = this.state.category_id;
        q.level_id = this.state.level_id;
        q.number = this.state.number;
        q.answered = this.state.answered;//1->remove  2->dont remove
        if(this.state.maxSize<this.state.number){
            alert("You can not set the number of questions greater than the max size!");
        }else {
            var self = this;
            quiz.addQuiz(self,q,function (rs) {
                console.log('submit rs=%j',rs);
                if (rs.status==200){
                    alert("Generate quiz success!");
                    self.setState({
                        quiz_id:rs.data.id,
                        goToCss:''
                    });
                    cookie.save('quiz_id', rs.data.id, { path: '/' });
                    console.log('quiz_id in cookie = '+cookie.load('quiz_id'));
                }else {
                    alert("Generate quiz failed!");
                }
            });
        }
    }
    render(){
        return(
            <form role="form" id="form">
                <div className="input_div">
                    <label className="input_left">Category</label>
                    <select className="form-control input_right" onChange={this.handleCategories}>
                        {this.state.categories}
                    </select>
                </div>
                <div className="input_div">
                    <label className="input_left">Level</label>
                    <select className="form-control input_right" onChange={this.handleLevels}>
                        {this.state.levels}
                    </select>
                </div>
                <div className="input_div">
                    <label className="input_left">Name</label>
                    <input type="text" disabled className="form-control input_right" value={this.state.name} />
                </div>
                <div className="input_div">
                    <label className="input_left">Number</label>
                    <input type="number" onChange={this.handleNumber} className="form-control input_right" value={this.state.number} />
                    <p>Avaiable:{this.state.maxSize}</p>
                </div>
                <div className="input_div">
                    <label className="input_left">Remove answered questions?</label>
                    <label className="radio-inline">
                        <input type="radio" name="answered" value="1"  checked={this.state.answered==1} onChange={this.handleRadio}/>Remove
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="answered" value="2" checked={this.state.answered==2} onChange={this.handleRadio}/>Don't remove
                    </label>
                </div>
                <button type="button" onClick={this.handleSubmit} className="btn btn-default">Submit</button>
                <button type="reset" className="btn btn-default">Reset</button>
                <button type="button" style={{display:this.state.goToCss}} onClick={this.handleGoTo} className="btn btn-success">Take the quiz now!</button>
                <input type="hidden" id="id" name="id"/>
            </form>
        )
    }
}

export default Setting