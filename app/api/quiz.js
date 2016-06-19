/**
 * Created by tommy on 2016/6/19.
 */
import base from '../base';

module.exports = {
    quizzes(q,cb){
        var url = base.local_url+"api/quiz";
        // console.log("get all quizzes, q="+q);
        if(q.category_id==null && q.level_id==null)
        {
            q = null;    
        }   
        $.ajax({
            url : url,
            type:'GET',
            data:q,
            dataType:'JSON',
            success(rs){
                // console.log("quizzes="+rs);
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
        
    },
    
    generate(q,cb){
        var url = base.local_url+"api/quiz/add";
        console.log("generate a new quiz");
        $.ajax({
            url : url,
            type:'GET',
            data:q,
            dataType:'JSON',
            success(rs){
                console.log("quizzes="+rs);
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    delete(q,cb){
        var url = base.local_url+"api/quiz/delete";
        console.log("delete quiz");
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