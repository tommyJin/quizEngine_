/**
 * Created by tommy on 2016/6/19.
 */
import React, {Component} from 'react';
import quiz from '../api/quiz';
import category from '../api/question_category';
import level from '../api/question_level';
import util from '../util';
import cookie from 'react-cookie';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.queryQuiz = this.queryQuiz.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.handleRetake = this.handleRetake.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handleCategories = this.handleCategories.bind(this);
        this.handleLevels = this.handleLevels.bind(this);
        this.pageNumbers = this.pageNumbers.bind(this);
        this.state = {
            category_id: '',
            categories: '',
            level_id: '',
            levels: '',

            keyword: '',

            td: '',
            pager: '',
            list: '',
            currentPage:1,
            pageSize: '',
            totalPage: '',
            totalRow: '',
            firstPage: '',
            pageNumber: '',
            lastPage: ''
        };
    }

    queryQuiz(category_id, level_id, pageNumber) {
        console.log("query quiz");
        console.log("category_id="+category_id);
        console.log("level_id="+level_id);
        console.log("pageNumber="+pageNumber);
        var q = {};
        q.page = pageNumber;
        var self = this;
        if (category_id != 0) {
            q.category_id = category_id;
        }
        if (level_id != 0) {
            q.level_id = level_id;
        }
        quiz.quizzes(self, q, function (rs) {
            var data = rs.data;
            var list = data.list;
            var pageNumber = data.pageNumber;
            var pageSize = data.pageSize;
            var totalPage = data.totalPage;
            var totalRow = data.totalRow;
            var firstPage = data.firstPage;
            var lastPage = data.lastPage;

            self.setState({
                list: list,
                currentPage:pageNumber,
                pageSize: pageSize,
                totalPage: totalPage,
                totalRow: totalRow,
                firstPage: firstPage,
                pageNumber: pageNumber,
                lastPage: lastPage
            });
        });
        return false;//prevent navigation to that link
    }

    handleDetail(id) {
        console.log('id in detail=' + id);
        cookie.save('quiz_id', id, {path: '/'});
        util.goTo('view/quiz/get');
        return false;//prevent navigation to that link
    }

    handleContinue(id) {
        console.log('id in continue=' + id);
        cookie.save('quiz_id', id, {path: '/'});
        util.goTo('view/quiz/question');
        return false;//prevent navigation to that link
    }

    handleDelete(id) {
        // console.log('id in delete=' + id);
        var q = {};
        q.quiz_id = id;
        quiz.deleteQuiz(q, function (rs) {
            alert("Delete Success!");
            var row_id = "#row_" + id;
            console.log("delete row_id=" + row_id);
            $(row_id).remove();
        });
    }

    handleRetake(id) {
        // console.log('id in retake=' + id);
        var q = {};
        q.quiz_id = id;
        quiz.retake(q, function (rs) {
            cookie.save('quiz_id', rs.data.id, {path: '/'});
            util.goTo('view/quiz/question');
            return false;//prevent navigation to that link
        });
    }

    componentDidMount() {
        console.log('componentDidMount');
        var self = this;
        var q = {};
        q.page = 1;
        quiz.quizzes(self, q, function (rs) {
            var data = rs.data;
            var list = data.list;
            var pageNumber = data.pageNumber;
            var pageSize = data.pageSize;
            var totalPage = data.totalPage;
            var totalRow = data.totalRow;
            var firstPage = data.firstPage;
            var lastPage = data.lastPage;

            var td = $.map(list, function (o) {
                return (
                    <tr role='row'>
                        <td className='center'> {o.id} </td>
                        <td className='center'><a target='_blank'
                                                  href='admin/route/hall_detail?id=" + o.id + "'> {o.name} </a></td>
                        <td className='center'> {o.category_name} </td>
                        <td className='center'> {o.level_name} </td>
                        <td className='center'>
                            <button type='button' className='btn btn-danger'>delete</button>
                        </td>
                    </tr>
                )
            });

            var pager = [];
            for (var i = 1; i <= totalPage; i++) {
                pager.push(
                    <li key={i} className={'paginate_button ' + i == pageNumber ? ' active' : '' }>
                        <button type="button"
                                className={  i === q.page ? ' current btn btn-primary' : ' btn btn-primary'}
                                onClick={self.queryQuiz.bind(self, 0, 0, i)}
                        >{i}</button>
                    </li>
                );
            }

            self.setState({
                category_id: 0,
                level_id: 0,
                td: td,
                list: list,

                pager:pager,

                currentPage:1,
                pageSize: pageSize,
                totalPage: totalPage,
                totalRow: totalRow,
                firstPage: firstPage,
                pageNumber: pageNumber,
                lastPage: lastPage
            });
        });

        category.categories(self, function (rs) {
            var data = rs.data;
            console.log('category.data = ', JSON.stringify(data));
            var categories = $.map(data, function (o, index) {
                return (<option key={index} value={o.id}>{o.name}</option>);
            });
            categories.unshift(<option key="select_module" value="0">Select Module</option>);
            self.setState({
                category_id: 0,
                categories: categories
            });
        });
        level.levels(self, function (rs) {
            var data = rs.data;
            var levels = $.map(data, function (o, index) {
                return (<option key={index} value={o.id}>{o.name}</option>);
            });
            levels.unshift(<option key="all_levels" value="0">All Levels</option>);
            self.setState({
                level_id: 0,
                levels: levels
            });
        });


    }

    pageNumbers() {
        let result = [];
        for (let i = 1; i <= this.state.totalPage; i++) {
            result.push(
                <li key={i} className={'paginate_button ' + i == this.state.pageNumber ? ' active' : '' }>
                    <button type="button"
                            className={  i === this.state.current ? ' current btn btn-primary' : ' btn btn-primary'}
                            onClick={this.queryQuiz.bind(this, this.state.category_id, this.state.level_id, i)}
                    >{i}</button>
                </li>
            );
        }
        return result;
    }

    handleCategories(e) {
        var category_id = e.target.value;
        console.log("handleCategories start value=" + category_id+" and level_id="+this.state.level_id);
        var q = {};
        q.page = 1;
        if (category_id != 0) {
            q.category_id = category_id;
        }
        if (this.state.level_id != 0) {
            q.level_id = this.state.level_id;
        }

        var self = this;
        quiz.quizzes(self, q, function (rs) {
            var data = rs.data;
            var pager = [];
            for (var i = 1; i <= data.totalPage; i++) {
                pager.push(
                    <li key={i} className={'paginate_button ' + i == data.pageNumber ? ' active' : '' }>
                        <button type="button"
                                className={  i === 1 ? ' current btn btn-primary' : ' btn btn-primary'}
                                onClick={self.queryQuiz.bind(self, category_id, self.state.level_id, i)}
                        >{i}</button>
                    </li>
                );
            }
            self.setState({
                pager:pager,
                list: data.list,
                pageSize: data.pageSize,
                totalPage: data.totalPage,
                totalRow: data.totalRow,
                firstPage: data.firstPage,
                pageNumber: data.pageNumber,
                lastPage: data.lastPage
            });
        });

        self.setState({
            category_id: category_id
        });
    }

    handleLevels(e) {
        var level_id = e.target.value;
        console.log("handleLevels start value=" + level_id+" and category_id="+this.state.category_id);
        var q = {};
        q.page = 1;
        if (this.state.category_id != 0) {
            q.category_id = this.state.category_id;
        }
        if (level_id != 0) {
            q.level_id = level_id;
        }
        var self = this;
        quiz.quizzes(self, q, function (rs) {
            var data = rs.data;
            var pager = [];
            for (var i = 1; i <= data.totalPage; i++) {
                pager.push(
                    <li key={i} className={'paginate_button ' + i == data.pageNumber ? ' active' : '' }>
                        <button type="button"
                                className={  i === 1 ? ' current btn btn-primary' : ' btn btn-primary'}
                                onClick={self.queryQuiz.bind(self, self.state.category_id, level_id, i)}
                        >{i}</button>
                    </li>
                );
            }
            self.setState({
                pager:pager,
                list: data.list,
                pageSize: data.pageSize,
                totalPage: data.totalPage,
                totalRow: data.totalRow,
                firstPage: data.firstPage,
                pageNumber: data.pageNumber,
                lastPage: data.lastPage
            });
        });

        self.setState({
            level_id: level_id
        });
    }


    render() {
        var _this = this, td = $.map(this.state.list, function (o, index) {
            var row_id = "row_" + o.id;
            var viewOrContinue;
            var state;
            if (o.mark == null) {
                viewOrContinue =
                    <button type='button' onClick={_this.handleContinue.bind(_this, o.id)} className='btn btn-info'>
                        GoOn</button>;
                state = <span className="red">Not finished</span>;
            } else {
                viewOrContinue =
                    <button type='button' onClick={_this.handleDetail.bind(_this, o.id)} className='btn btn-primary'>
                        View</button>
                state = <span className="green">Finished</span>;
            }
            var level_name = o.level_name == null ? "All levels" : o.level_name;
            return (
                <tr key={index} id={row_id}>
                    <td className='center'> {o.id} </td>
                    <td className='center'> {o.category_name} </td>
                    <td className='center'> {level_name} </td>
                    <td className='center'> {state} </td>
                    <td className='center'>
                        {viewOrContinue}
                        <button type='button' onClick={_this.handleDelete.bind(_this, o.id)} className='btn btn-danger'>
                            Delete
                        </button>
                        <button type='button' onClick={_this.handleRetake.bind(_this, o.id)}
                                className='btn btn-success'>
                            Retake
                        </button>
                    </td>
                </tr>);
        }.bind(_this));
        // console.log("firstPage "+this.state.firstPage+" last "+this.state.lastPage);
        return (
            <div>
                <div className="row">

                    <div className="col-sm-6">
                        <div className="dataTables_length">
                            <a href="view/quiz/setting" className="btn btn-success">Generate a new one</a>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div id="dataTables-example_filter" className="dataTables_filter">
                            <select className="form-control input_right" onChange={this.handleCategories}>
                                {this.state.categories}
                            </select>
                        </div>
                        <div id="dataTables-example_filter" className="dataTables_filter">
                            <select className="form-control input_right" onChange={this.handleLevels}>
                                {this.state.levels}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-striped table-bordered table-hover dataTable no-footer">
                            <thead>
                            <tr>
                                <th style={{width: '10%'}}>ID</th>
                                <th style={{width: '20%'}}>Module</th>
                                <th style={{width: '20%'}}>Level</th>
                                <th style={{width: '20%'}}>State</th>
                                <th style={{width: '30%'}}>Actions</th>
                            </tr>
                            </thead>
                            <tbody id="list">
                            {td}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row" id="pager">
                    <div>
                        <div className='col-sm-4'> {this.state.totalRow} records</div>
                        <div className='col-sm-8'>
                            <div className='dataTables_paginate paging_simple_numbers'>
                                <ul className='pagination'>
                                    <li className={'paginate_button previous ' + _this.state.firstPage ? ' disabled' : '' }>
                                        <button type="button" className="btn btn-info"
                                                onClick={_this.queryQuiz.bind(_this, _this.state.category_id, _this.state.level_id, _this.state.pageNumber - 1 > 0 ? (_this.state.pageNumber - 1) : 1)}>
                                            Previous
                                        </button>
                                    </li>
                                    {_this.state.pager}
                                    <li className={'paginate_button next ' + _this.state.lastPage ? ' disabled' : '' }>
                                        <button type="button" className="btn btn-info"
                                                onClick={_this.queryQuiz.bind(_this, _this.state.category_id, _this.state.level_id, _this.state.totalPage + 1 <= _this.state.totalPage ? (_this.state.pageNumber + 1) : _this.state.totalPage)}>
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Quiz