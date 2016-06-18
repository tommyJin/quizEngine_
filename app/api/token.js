/**
 * Created by tommy on 2016/6/16.
 */
import base from '../base';
module.exports = {
    getToken(cb){
        var url = base.local_url+"api/token/get";
        console.log("get token");
        $.ajax({
            url : url,
            type:'GET',
            dataType:'JSON',
            success(rs){
                console.log("token="+rs);
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
}
};