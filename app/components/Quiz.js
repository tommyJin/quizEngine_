/**
 * Created by tommy on 2016/6/19.
 */
import React, {Component} from 'react';
import quiz from '../api/quiz';
import util from '../util';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.query = this.query.bind(this);
        this.handleKeyword = this.handleKeyword.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.pageNumbers = this.pageNumbers.bind(this);
        this.state = {
            keyword: '',
            category_id: '',
            level_id : '',

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

    query(keyword, category_id, level_id, pageNumber) {
        this.setState = {
          pageNumber : pageNumber  
        };
        return false;//prevent navigation to that link
    }

    handleDetail(id) {
        // console.log('id in detail=' + id);
        util.goTo('view/quiz/get?id='+id);
        return false;//prevent navigation to that link
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
            self.setState({
                td: td,
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

    pageNumbers() {
        let result = [];
        for (let i = 1; i <= this.state.totalPage; i++) {
            result.push(
                <li  key={i} className={'paginate_button ' +i==this.state.pageNumber?' active':'' }>
                    <button type="button" className={  i === this.state.current ? ' current btn btn-primary' : ' btn btn-primary'}
                       onClick={this.query.bind(this,this.state.keyword,this.state.category_id,this.state.level_id,i)}
                    >{i}</button></li>
            );
        }
        return result;
    }

    render() {
        var _this = this, td = $.map(this.state.list, function (o, index) {
            return (
                <tr key={index}>
                    <td className='center'> {o.id} </td>
                    <td className='center'>{o.name}</td>
                    <td className='center'> {o.category_name} </td>
                    <td className='center'> {o.level_name} </td>
                    <td className='center'>
                        <button type='button' onClick={_this.handleDetail.bind(_this,o.id)} className='btn btn-danger'>
                            View
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
                                    <li className={'paginate_button previous ' +this.state.firstPage?' disabled':'' }>
                                        <a type="button" href="" onClick={this.query.bind(this,this.state.keyword,this.state.category_id,this.state.level_id, this.state.pageNumber-1>0?(this.state.pageNumber-1):1)}>
                                        Previous</a>
                                    </li>
                                    {this.pageNumbers()}
                                    <li  className={'paginate_button next ' +this.state.lastPage?' disabled':'' }>
                                        <a type="button" href="" onClick={this.query.bind(this,this.state.keyword,this.state.category_id,this.state.level_id, this.state.totalPage+1<=this.state.totalPage?(this.state.pageNumber+1):this.state.totalPage)}>
                                            Next</a>
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