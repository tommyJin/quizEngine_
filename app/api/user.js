/**
 * Created by tommy on 2016/6/11.
 */
import base from '../base';
import token from './token';

module.exports = {
    login(q,cb){
        var url = base.base_url+"session/login";
        // console.log("url="+url);
        $.ajax({
            url:url,
            data:q,
            type:'POST',
            dataType:'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert('ajax error');
            }
        })
    },
    
    logout(q,cb){
        var url = base.base_url+"session/logout";
        $.ajax({
            url:url,
            data:q,
            type:'GET',
            dataType:'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert('ajax error');
            }
        })
    },

    getOne(q,cb){
        var url = base.local_url+"api/user/get";
        $.ajax({
            url:url,
            type:'GET',
            dataType:'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert('ajax error');
            }
        })
    },

    update(q,cb){
        var url = base.base_url+"api/user/update";
        $.ajax({
            url:url,
            data:q,
            type:'GET',
            dataType:'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert('ajax error');
            }
        })
    }

};