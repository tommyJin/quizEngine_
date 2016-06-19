/**
 * Created by tommy on 2016/6/19.
 */
import React, {Component} from 'react';
import quiz from '../api/quiz';
import util from '../util';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.addNewQuiz = this.addNewQuiz.bind(this);
        this.query = this.query.bind(this);
        this.handleKeyword = this.handleKeyword.bind(this);
        this.state = {
            keyword: '',
            td: '',
            pager: '',
            list: '',
            pageSize: '',
            totalPage: '',
            totalRow: '',
            firstPage: '',
            pageNumber: '',
            lastPage: ''
        };
    }

    addNewQuiz() {

    }

    query() {

    }


    handleKeyword(e) {
        this.setState({keyword: e.target.value});
    }

    componentDidMount() {
        console.log('componentDidMount');
        var self = this;
        quiz.quizzes(self, function (rs) {
            var data = rs.data;
            var list = data.list;
            var pageNumber = data.pageNumber;
            var pageSize = data.pageSize;
            var totalPage = data.totalPage;
            var totalRow = data.totalRow;
            var firstPage = data.firstPage;
            var lastPage = data.lastPage;

            console.log("quizzes= %j", data);
            console.log("list in component=  %j", list);

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
            console.log("td = " + td);
            var pager = "pager";
            console.log("pager = " + pager);


            self.setState({
                td: td,
                pager: pager,
                list: list,
                pageSize: pageSize,
                totalPage: totalPage,
                totalRow: totalRow,
                firstPage: firstPage,
                pageNumber: pageNumber,
                lastPage: lastPage
            });


        });
    }

    render() {
        var pager = function () {
            for (var i = 0; i < this.state.totalPage; i++) {
                return (
                    <li class='paginate_button" + (pageNumber == i ? " active" : "") + "'><a href=''
                                                                                             onclick='queryHall(" + i + ");return false'>"
                        + i + "</a></li>
                )
            }
        };
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
                            <label>Keyword:<input type="search" id="keyword" onChange={this.handleKeyword}
                                                  className="form-control input-sm"/></label>
                            <button type="button" onClick={this.query} className="btn btn-default">Search</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-striped table-bordered table-hover dataTable no-footer">
                            <thead>
                            <tr>
                                <th style={{width: '20%'}}>ID</th>
                                <th style={{width: '20%'}}>Name</th>
                                <th style={{width: '20%'}}>Level</th>
                                <th style={{width: '20%'}}>Category</th>
                                <th style={{width: '20%'}}>Actions</th>
                            </tr>
                            </thead>

                            <QuizList quizzes={this.state.list}/>

                        </table>
                    </div>
                </div>
                <div className="row" id="pager">

                    <div>
                        <div className='col-sm-4'> {this.state.totalRow} records</div>
                        <div className='col-sm-8'>
                            <div className='dataTables_paginate paging_simple_numbers'>
                                <ul className='pagination'>
                                    <li className='paginate_button previous " + (firstPage ? " disabled" : "") + "'><a
                                        href=''
                                        onclick='queryHall(" + ( (pageNumber - 1)>0?(pageNumber - 1):1 ) + ");return false'>Previous</a>
                                    </li>
                                    {this.state.totalPage}
                                    <li className='paginate_button next " + (lastPage ? " disabled" : "") + "'>
                                        <a href=''
                                           onclick='queryHall(" + ( (pageNumber + 1)<=totalPage?(pageNumber + 1):totalPage ) + ");return false'>Next</a>
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

class QuizList extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
    }

    handleDetail(url) {
        util.goTo(url);
    }

    handleDelete(id) {
        var q = {};
        q.id = id;
        quiz.delete(q,function (rs) {
            alert(rs.data);
        })
    }

    render() {
        var _this = this,td = $.map(this.props.quizzes, function (o, index) {
            return (
                <tr key={index}>
                    <td className='center'> {o.id} </td>
                    <td className='center'><a target='_blank' href=''
                                              onClick={this.handleDetail.bind(null,'view/quiz/get?id='+o.id)}> {o.name} </a>
                    </td>
                    <td className='center'> {o.category_name} </td>
                    <td className='center'> {o.level_name} </td>
                    <td className='center'>
                        <button type='button' onClick={_this.handleDelete} className='btn btn-danger'>delete</button>
                    </td>
                </tr>);
        }.bind(this));
        return (
            <tbody id="list">
            {td}
            </tbody>
        )
    }
}
//
// class QuizPager extends Component {
//     constructor(props) {
//         super(props);
//     }
//
//
//     render() {
//         var page = function () {
//             return (
//                 <li class='paginate_button" + (pageNumber == i ? " active" : "") + "'><a href=''
//                                                                                          onclick='queryHall(" + i + ");return false'>"
//                     + i + "</a></li>
//             )
//         }.bind(this));
//        
//         return (
//             <div>
//                 {page}
//             </div>
//         )
//     }
// }

export default Quiz