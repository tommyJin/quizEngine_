/**
 * Created by tommy on 2016/6/16.
 */
import base from '../base';
module.exports = {
    setToken(q,cb){
        var url = base.local_url+"token/set";
        $.ajax({
           url : url,
            data:q,
            type:'GET',
            dataType:'JSON',
            success(rs){
                alert("");
                // cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },
    
    getToken(cb){
        var url = base.local_url+"token/get";
        $.ajax({
            url : url,
            type:'GET',
            dataType:'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
}
};