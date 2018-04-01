
//获取任务号详情传过来的任务号详情id；
var address="http://192.168.20.110:8086/";

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return unescape(r[2]);
    return null;
}
// var hysidxq=GetQueryString("rwhid");
// var hysidxq=GetQueryString("hysId");
var rwhid=GetQueryString("id");


$(document).ready(function () {
    addpeo()
})

//加载该任务号的所有评论人；
function addpeo() {
    $.ajax({
        type:"GET",
        url:address +"task/s_all",
        data:{id:rwhid},
        dataType:"json",
        success:function (data) {
            console.log(data,"任务号详情")
            var datalist=data.data.list[0].assesses;
            console.log(datalist);
            for(var i in datalist){
                $(".pgtitle").after(' <li>\n' +
                    '        <span>'+datalist[i].user.name+'</span>\n' +
                    '        <span>'+datalist[i].assessTime+'</span>\n' +
                    '    </li>')
            }

        }
    })

}

//点击评估投票，弹出模态框，和遮罩层  只有项目经理有权限确认工时
$(".topButton-btn button:nth-of-type(1)").click(function () {
       if(sessionStorage.role==""||sessionStorage.role==undefined){
            location.href="login.html"
       }else {
           alert("管理员访问人员成功！");
           $(".opcaty").css("display","block")
           $(".vote").css("display","block")
       }
})

//点击评估的确定；
$(".vote .buttonS").click(function () {
    // var a=  $(".topTitle .right span").text();
    var b= $("#worktime").val()  //确认的工时
    $.ajax({
        type:"POET",
        url:address +"add_assess",
        headers: {
            token:sessionStorage.token
        },
        data:JSON.stringify(
            {
                taskId:rwhid,assessTime:b
            }
        ),
        xhrFields: {
            withCredentials: true
        },
        contentType:"application/json;charset=utf-8",
        success:function (data) {
            console.log("评估成功")
            addpeo()
        }
    })
})


//点击工时确认，弹出提示；
$(".topButton-btn button:nth-of-type(2)").click(function () {
    if(sessionStorage.role==2){
        alert("工时已确认！")
    }else {
        alert("您没有此权限！")
    }
})


//点击取消影藏模态框和遮罩层
$(".vote .buttonB").click(function () {
    $(".opcaty").css("display","none")
    $(".vote").css("display","none")
})

//点击确定，取消显示的；
$(".vote .buttonS").click(function () {
    $(".vote .buttonB").trigger("click");
    var text=$(this).parent().prev().children().val()
    console.log(text)
});

//点击返回按钮，返回上一页
$(".topButton .right").click(function(){
    history.back(-1)
})