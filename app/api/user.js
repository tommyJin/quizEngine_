/**
 * Created by tommy on 2016/6/11.
 */
import base from '../base';
import token from './token';

module.exports = {
    login(q,cb){
        var url = base.base_url+"session/login";
        console.log("base_url="+url);
        $.ajax({
            url:url,
            data:q,
            type:'POST',
            dataType:'JSON',
            success(rs){
                token.setToken(rs.data,function () {});
                cb(rs);
            },
            error(){
                alert('ajax error');
            }
        })
    },

    getOne(q,cb){
        var url = base.local_url+"user/get";
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
        var url = base.base_url+"admin/user/update";
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