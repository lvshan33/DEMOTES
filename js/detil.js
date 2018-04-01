// sessionStorage.type=1
//type=1,无权限，type=3有权限；
//通过首页验证密令成功进入详情页展示，只有管理员和经理才可以创建
var address="http://192.168.20.110:8086/";
alert("进入详情页")
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return unescape(r[2]);
    return null;
}
var hysidxq=GetQueryString("id");


$(document).ready(function () {
    gethysxq()
})



//获取会议室详情
function gethysxq() {
    $.ajax({
        type: "GET",
        url: address + "hys/s_all",
        data: {id: hysidxq},
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            console.log(data, "会议室详情,显示任务号")
            var dataDetil = data.data.list;
            $(".hystitle").html(dataDetil[0].hyName)
            var hysxq=dataDetil[0].tasks;  //每个任务号的评估人信息
            for(var i in hysxq){
                $(".userList-title").after('<li data-rwhid="'+hysxq[i].id+'">\n' +
                    '         <span>\n' +
                    '            <span>'+hysxq[i].taskName
                    +'</span> <br>\n' +
                    '            <span>'+hysxq[i].des+'</span>\n' +
                    '        </span>\n' +
                    '        <span></span>\n' +
                    '\n' +
                    '    </li>')
            }
        }
    })
}



//点击创建按钮，需要验证创建人身份，如果还没有登录显示登陆框，
  $("#creattt").click(function () {
    alert("点击创建按钮，验证是否登录，查看权限！")
    if(sessionStorage.role==""||sessionStorage.role==undefined){
        location.href="login.html"

    }else if(sessionStorage.role==1||sessionStorage.role==2){
        $("#loginBox .rfloat").trigger("click");
        $("#opcaVote").css("display","block");
        $(".opcaty").css("display","block");
        $("#opcaVote .vote-title").html( $(".hystitle").html())

    }
    //    alert("还没有登录人信息，显示登录框！")
    //     $("#loginBox").css("display","block")
    //     $(".opcaty").css("display","block")
    //
    //     //点击登录框的返回取消影藏模态框和遮罩层
    //     $("#loginBox .rfloat").click(function () {
    //         alert("登录返回！")
    //         $(".opcaty").css("display","none")
    //         $("#loginBox").css("display","none")
    //     })
    //  //点击登录框的确定，验证登录后，取消显示的，打开创建框；
    //     $("#loginBox .buttonS").click(function () {
    //         alert("登录信息提交，验证身份 ！")
    //
    //         var usernamew=$("#usernamew").val()
    //         var pass=$("#pass").val()
    //         alert(usernamew)
    //         alert(pass)
    //
    //         $.ajax({
    //             type: "POST",
    //             url: address + "login",
    //             contentType:"application/json;charset=utf-8",
    //             data:JSON.stringify(
    //                 {
    //                     nickname: usernamew,password:pass
    //                 }
    //             ),
    //             xhrFields: {
    //                 withCredentials: true
    //             },
    //             success: function (data) {
    //                 if(data.code==0){
    //                     sessionStorage.token=data.token;
    //                     sessionStorage.username=data.user.name;
    //                     sessionStorage.role=data.user.role;
    //                     login();
    //                 }else {
    //                     alert("登录信息填写错误！")
    //                     $(".opcaty").css("display","none");
    //                     $("#opcaVote").css("display","none");
    //                     $("#loginBox").css("display","none");
    //                 }
    //
    //             }
    //         })
    //
    //         $(".vote input").val("")
    //     });
    // }
    //    login()
})


//有了登录信息后，判断是否有权限；1 普通人无权限  ||2 项目经理  ||3管理员；
function  login() {
    //如果有登录信息，没有权限
    if(sessionStorage.role==0){
        alert("您没有此权限！");
        $(".opcaty").css("display","none");
        $("#opcaVote").css("display","none");
        $(".opcaty").css("display","none")
    }
    //如果有登录信息，也有权限，显示创建模态框
    if(sessionStorage.role==1||sessionStorage.role==2){
        $("#loginBox .rfloat").trigger("click");
        $("#opcaVote").css("display","block");
        $(".opcaty").css("display","block");

        $("#opcaVote .vote-title").html( $(".hystitle").html())


    //  点击创建框取消的时候
        $("#opcaVote .rfloat").click(function () {
            alert("取消创建！")
            $(".opcaty").css("display","none");
            $("#opcaVote").css("display","none");
            $(".opcaty").css("display","none")
        })

        //点击创建框确定的时候

        $("#opcaVote .buttonS").click(function () {
            alert("创建任务提交！！")

            var workIdval=$("#workIdval").val()
            var workname=$("#workname").val()
            var hysid=hysidxq;
            alert(workId)
            alert(workname)
            alert(hysid)
            $.ajax({
                type: "POST",
                url: address + "add_task",
                contentType:"application/json;charset=utf-8",
                data:JSON.stringify(
                    {
                        taskName: workIdval,des:workname,hysId:hysid,

                    }
                ),
                headers: {
                    token:sessionStorage.token
                },
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                   alert("任务添加成功！")
                    gethysxq()
                }
            })

            $(".opcaty").css("display","none");
            $("#opcaVote").css("display","none");
        })
    }
}








//
// //修改密码
// $("#changepass").click(function () {
//     $("#creatVote").css("display","block")
//     $(".opcaty").css("display","block")
// })
//
// //修改密码返回
//
// $("#creatVote .buttonB").click(function(){
//     $("#creatVote").css("display","none");
//     $(".topButton .topbutton").trigger('click')
// })
//
// //修改密码确定
// $("#creatVote .buttonS").click(function(){
//     var datel=$("#datel").val()
//     $("#creatVote").css("display","none");
//     $("#loginBox .rfloat").trigger('click')
// })

//点击头部返回箭头，返回上一页
$(".topButton .right").click(function(){
    history.back(-1)
})


//点击每一个任务号，跳至任务号详情页，由项目经理确认工时
$(".userList").on("click",".userList-title~li",function(){
    alert("评估详情页！")
    var rwhid=$(this).data('rwhid')
    console.log($(this).data('rwhid'),"任务号id")
    location.href="vote.html?id="+rwhid;
})