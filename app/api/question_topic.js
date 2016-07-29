/**
 * Created by tommy on 2016/7/26.
 */

import base from '../base';

module.exports = {
    topics(p,q,cb){
        var url = base.local_url+"api/question/topics";
        $.ajax({
            url : url,
            type:'GET',
            data:q,
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
