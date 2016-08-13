/**
 * Created by tommy on 2016/6/19.
 */
import base from '../base';

module.exports = {

    getQuiz(p, q, cb){
        var url = base.local_url + "api/quiz/get";
        // console.log("generate a new quiz");
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                console.log("quiz=" + rs);
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    quizzes(p, q, cb){
        var url = base.local_url + "api/quiz";
        // console.log("get all quizzes, q="+q);
        if (q.category_id == null && q.level_id == null) {
            q = {};
            q.page = 1;
        }
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                // console.log("quizzes="+rs);
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });

    },

    addQuiz(p, q, cb){
        var url = base.local_url + "api/quiz/add";
        // console.log("generate a new quiz");
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                console.log("quiz=" + rs);
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    getQuestions(p, q, cb){
        var url = base.local_url + "api/quiz/question";
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },


    getRecord(p, q, cb){
        var url = base.local_url + "api/quiz/oneRecord";
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    getRecords(p, q, cb){
        var url = base.local_url + "api/quiz/record";
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    saveAnswer(p, q, cb){
        var url = base.local_url + "api/quiz/saveAnswer";
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    maxSize(p, q, cb){
        var url = base.local_url + "api/quiz/question/maxSize";
        console.log("get max size");
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                console.log("quiz=" + rs);
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    over(p, q, cb){
        var url = base.local_url + "api/quiz/finish";
        console.log("finish quiz  id=" + JSON.stringify(q));
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    deleteQuiz(q, cb){
        var url = base.local_url + "api/quiz/delete";
        console.log("delete quiz");
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    retake(q, cb){
        var url = base.local_url + "api/quiz/retake";
        console.log("retake quiz");
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    quizLevelAnalysis(p, q, cb){
        var url = base.local_url + "api/quiz/quizLevelAnalysis";
        console.log("quizLevelAnalysis");
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    },

    overallLevelAnalysis(p, q, cb){
        var url = base.local_url + "api/quiz/overallLevelAnalysis";
        console.log("overallLevelAnalysis");
        $.ajax({
            url: url,
            type: 'GET',
            data: q,
            dataType: 'JSON',
            success(rs){
                cb(rs);
            },
            error(){
                alert("ajax error");
            }
        });
    }
};