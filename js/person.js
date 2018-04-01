

//从首页验证了身份，进来人员页面，点击创建；
$(".topButton .topbutton").click(function () {
    $(".opcaty").css("display","block")
    $(".vote").css("display","block")
})

//点击返回取消影藏模态框和遮罩层
$(".vote .buttonB").click(function () {
    $(".opcaty").css("display","none")
    $(".vote").css("display","none")
})
//
// //点击登录确定，取消显示的；
$(".vote .buttonS").click(function () {
    $(".vote .buttonB").trigger("click");

   var usernamew=$("#usernamew").val()
   var name=$("#name").val()
   var telephone=$("#telephone").val()
   var email=$("#email").val()
   var post=$("#post option:selected").val()

    alert(usernamew)
    alert(name)
    alert(telephone)
    alert(email)
    alert(post)
});
//
// //取消值显示
$(".vote .buttonS,.vote .buttonB").click(function () {
     $("#addPerson input").val("")
})