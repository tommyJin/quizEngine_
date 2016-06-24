/**
 * Created by tommy on 2016/6/23.
 */
import base from '../base';

module.exports = {
    categories(q,cb){
        var url = base.local_url+"api/question/categories";
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
