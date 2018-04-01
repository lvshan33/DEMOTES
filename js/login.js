
//不同的入口可以登录，通过第一次登录记录登录人信息；

// sessionStorage.role=0;
//
// role=0:普通员工；
// role=1；经理；
// role=2:管理员：
var address="http://192.168.20.110:8086/";

var  workname;
var  workId;

if(!sessionStorage.role) {
    type();
}


function type (){
    switch(sessionStorage.type) {
        case "1":
            role(function(){
                if(sessionStorage.role==2){
                    alert("管理员访问人员成功！");
                    location.href="person.html"
                }else {
                    alert("您没有此权限！")
                }
            });
            break;
        case "2":
            role(function(){
                if(sessionStorage.role==1||sessionStorage.role==2) {
                    alert("管理员和经理访问项目成功！")
                    location.href="projectList.html"
                }
            });
            break;
        case "3":
            role(function(){
                alert("访问会议室")
                if(sessionStorage.role==1||essionStorage.role==2){
                    alert("管理员和经理访问会议室成功！");
                    location.href="boardList.html"
                }
            })
            break;
        default:
            role();

    }
}


//登录请求成功，判断角色！！！
function login(callback) {
    $.ajax({
        type: "POST",
        url: address + "login",
        contentType:"application/json;charset=utf-8",
        data:JSON.stringify(
            {
                nickname: workname,password:workId
            }
        ),
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if(data.code==0){
                sessionStorage.token=data.token;
                sessionStorage.username=data.user.name;
                sessionStorage.role=data.user.role;
                if(callback) {
                    callback();
                }
            }else {
                alert("登录信息错误！")
            }
        }
    })
}


//登录框
function role(callback) {

        //点击登陆框保存！！！
        $("#login-btn .buttonS").click(function () {
            alert("登录确定！")
           workname=$("#usernamew").val()    //用户
           workId=$("#pass").val()     //密码
            if(workId==""||workname==""){
                alert("请填写完整信息！")
            }else {
                if(callback) {
                    login(callback);
                }else {
                    login()
                }
            }
        })
        //点击返回影藏模态框和遮罩层
        $("#login-btn .rfloat").click(function () {
            alert("登录返回！")
            history.back(-1)
        })


        //点你修改密码
        $("#changepass").click(function () {
            alert("修改密码！！！")
            $("#creatVote").css("display","block")
            $(".opcaty").css("display","block")
            $("#opcaVotep").css("display","none")
        })

//修改密码返回

        $("#creatVote .buttonB").click(function(){
            $("#creatVote").css("display","none");
            $(".opcaty").css("display","none")
        })

//修改密码确定
        $("#creatVote .buttonS").click(function(){
            var datel=$("#datel").val();
            alert(datel,"新密码！！")
            $("#creatVote").css("display","none");
            $(".opcaty").css("display","none")
        })
    if(sessionStorage.role==0){
        alert("等于0您没有此权限！");
    }
}

//首页
//点击项目  管理员和经理可以进入
$("#project").click(function (){
    alert("点击项目");
    if(sessionStorage.type == undefined || sessionStorage.type =="") {
        sessionStorage.type = 2;
    }
});
//点击会议室, 管理员和经理都有权限
$("#work").click(function () {
    alert("点击会议室");
    if(sessionStorage.type == undefined || sessionStorage.type =="") {
        sessionStorage.type = 3;
    }

});
//点击人员,只有管理员有权限
$("#person").click(function () {
    alert("点击人员");
    if(sessionStorage.type == undefined || sessionStorage.type =="") {
        sessionStorage.type = 1;
    }
});


//详情页点击创建任务验证登录
//点击创建按钮，需要验证创建人身份，如果还没有登录显示登陆框，
$("#creattt").click(function () {
    role(function(){
        if(sessionStorage.role==1||sessionStorage.role==2){
            $("#loginBox .rfloat").trigger("click");
            $("#opcaVote").css("display","block");
            $(".opcaty").css("display","block");
            $("#opcaVote .vote-title").html( $(".hystitle").html())
        }else {
            alert("您的登录信息有错误！")
        }
    })
})



//评估页面点击投票验证登录  都有权限
//点击评估投票，弹出模态框，和遮罩层  只有项目经理有权限确认工时
$(".topButton-btn button:nth-of-type(1)").click(function () {
    role(function(){
        if(sessionStorage.role){
            alert("管理员访问人员成功！");
            $(".opcaty").css("display","block")
            $(".vote").css("display","block")

        }else {
            alert("您的登录信息有错误！")
        }
    })
})