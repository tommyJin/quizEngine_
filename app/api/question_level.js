/**
 * Created by tommy on 2016/6/23.
 */
import base from '../base';

module.exports = {
    levels(q,cb){
        var url = base.local_url+"api/question/levels";
        $.ajax({
            url : url,
            type:'GET',
            // data:q,
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
