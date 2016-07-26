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
    
    addQuiz(p,q,cb){
        var url = base.local_url+"api/quiz/add";
        // console.log("generate a new quiz");
        $.ajax({
            url : url,
            type:'GET',
            data:q,
            dataType:'JSON',
            success(rs){
                console.log("quiz="+rs);
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    getQuestions(p,q,cb){
        var url = base.local_url+"api/quiz/question";
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
    },
    
    saveAnswer(p,q,cb){
        var url = base.local_url+"api/quiz/saveAnswer";
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
    },

    maxSize(p,q,cb){
        var url = base.local_url+"api/quiz/question/maxSize";
        console.log("get max size");
        $.ajax({
            url : url,
            type:'GET',
            data:q,
            dataType:'JSON',
            success(rs){
                console.log("quiz="+rs);
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    over(q,cb){
        var url = base.local_url+"api/quiz/finish";
        console.log("finish quiz");
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