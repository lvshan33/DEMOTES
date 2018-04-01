
var address="http://192.168.20.114:8086/";

$(document).ready(function () {
    allhys()
})

//加载每一项
function allhys() {
    $.ajax({
        type:"GET",
        url:address+"/hys/s_bean",
        data:"",
        xhrFields:{
            withCredentials: true
        },
        success: function(data) {

            console.log(data.data.list,"所有会议室！")
            console.log(data.data,"开放的会议室！")
            var datalist=data.data.list;
            for(var i in datalist){
                var stadu;
                if(datalist[i].status==0){
                    stadu="开放"
                }else if(datalist[i].status==1){
                    stadu="关闭"
                }
                $(".userList").append(' <li data-id="'+datalist[i].id+'">\n' +
                    '            <span>'+datalist[i].hyName+'</span>\n' +
                    '            <span>\n' +
                    '            <span>'+datalist[i].cDate+'</span>\n' +
                    '            <span>'+stadu+'</span>\n' +
                    '        </span>\n' +
                    '    </li>')
            }
        }
    })
}




//点击每一项，验证登录密码
$(".userList").on("click","li",function () {
    alert("验证会议室密令框！")
    $(".opcaty").css("display","block");
    $(".hidenVote").css("display","block");
    var hysid=$(this).data('id');

    // alert(hysid,"会议室ID")




    //点击会议室释放，取消显示的；
    $("#opcaVotep .buttonS").click(function () {
        alert("会议室释放！")
        var password=$(this).parent().prev().children().val()
        var username=$(this).parent().prev().prev().children().val()

        $.ajax({
            type:"POST",
            url:address+"/hys/update",
            data:{id:hysid,status:1,hyPwd:password},
            xhrFields:{
                withCredentials: true
            },
            success: function(data) {
                if(data.code==0){
                    alert("会议室释放成功！")
                }else {
                    alert("密令不正确！")
                }

            }
        })


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




//点击返回取消影藏模态框和遮罩层
$(".vote .backBtn").click(function () {
    $(".opcaty").css("display","none")
    $(".vote").css("display","none")
});


// //点击验证登陆保存，取消显示的；
$(".vote .vote-save").click(function () {
    $(".vote .backBtn").trigger("click");
    var pass=$("#username").next().find('input').val()


});



//点击创建，弹出创建框,只有管理员有权限！
$('.topButton .creatBoard').click(function(){
    if(sessionStorage.role==2){
        $(".opcaty").css("display","block");
        $(".creatVote").css("display","block");

        //点击创建确定，记录数据传回后台
        $(".creatVote .buttonS").click(function () {
            var boardnamew=$("#boardnamew").val()
            var say=$("#say").val()
            var boardpass=$("#boardpass").val()
            var datel=$("#datel").val()
            var peonum=$("#peonum").val()
            var votenum=$("#votenum").val()

            $.ajax({
                type:"POST",
                url:address+"/hys/save",
                data:{hyName:boardnamew,content:say,hyPwd:boardpass,deadline:datel
                ,num:peonum,assessCount:votenum},
                xhrFields:{
                    withCredentials: true
                },
                success: function(data) {
                    alert("新增会议室成功!")
                    allhys()
                   console.log(data)
                }
            })

        })

//点击创建取消后
        $(".creatVote .buttonB").click(function () {
            $(".opcaty").css("display","none")
            $(".creatVote").css("display","none")
        })


//创建取消值显示
        $(".creatVote .buttonB,.creatVote .buttonS").click(function () {
            $(".creatVote input").val('')
        })


    }else {
        alert("您没有此权限！")
    }

})


