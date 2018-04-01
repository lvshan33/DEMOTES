//首页只需要验证会议室密令，看是否有权限进入该会议室！
// 需要的参数是  用户名，会议室密令， 还有进入会议室人数

var address="http://192.168.20.114:8086/";


$(document).ready(function () {
    hysstart()
})
//请求会议室列表

function hysstart() {
    $.ajax({
        type:"GET",
        url:address+"/hys/s_bean",
        data:{status:"0"},
        xhrFields:{
            withCredentials: true
        },
        success: function(data) {
            var datalist=data.data.list;
            for(var i in datalist){
                  $(".userList").append(' <li data-id="'+datalist[i].id+'">\n' +
                      '            <span>'+datalist[i].hyName+'</span>\n' +
                      '            <span>\n' +
                      '            <span>'+datalist[i].cDate+'</span>\n' +
                      '            <span>开放</span>\n' +
                      '        </span>\n' +
                      '    </li>')
            }
        }
    })


//点击每个li弹出验证会议室密令

    $(".userList").on("click","li",function () {
        alert("验证会议室密令框！");
        var hysid=$(this).data('id');;
        $(".opcaty").css("display","block");
        $("#opcaVotep").css("display","block");
        var text=$(this).find("span").first().text()
        $("#home").find('span').text(text)




        //点击登录确定，取消显示的；
        $("#opcaVotep .buttonS").click(function () {
            alert("点击登录，验证密令，和人数限制！")
            var password=$(this).parent().prev().children().val()
            if(password==""){
                alert("会议室密令不能为空！")
            }else {
                $.ajax({
                    type:"POST",
                    url:address+"hys/hys_login",
                    data:{hyPwd:password,id:hysid},
                    xhrFields:{
                        withCredentials: true
                    },
                    success: function(data) {
                        console.log(data)
                        console.log("会议室密令！")
                        $(".opcaty").css("display","none")
                        $("#opcaVotep").css("display","none")
                        if(data.code==0){
                            //会议室密码
                            location.href="detil.html?id="+hysid;
                        }else {
                            alert("您没有此权限！")
                        }
                    }
                })
            }
        });

        //点击返回影藏模态框和遮罩层
        $(".vote .buttonB").click(function () {
            $(".opcaty").css("display","none")
            $("#opcaVotep").css("display","none")
        })

        // //取消值显示
        // $("#person,#project,#work").click(function () {
        //     alert("请判断登录！！")
        //     $("#loginBox").css("display","block")
        // })
    })

}





//点击项目，管理员和经理都有权限
$("#project,#work,#person").click(function (){
    if(sessionStorage.role==""||sessionStorage.role==undefined){
        location.href="login.html"
        alert(sessionStorage.role)
    }
});


