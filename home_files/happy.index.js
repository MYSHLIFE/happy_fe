//首页
jQuery(document).ready(function($) {
    var panel_open = false;

    $("body").on("click", ".tag_p2", function(event) {
            event.preventDefault();

            $(".tag1").animate({
                    opacity: '0.3'
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(".tag_p1").animate({
                    opacity: '0.3'
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(this).animate({
                    opacity: 1
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(".tag2").animate({
                    opacity: '0.9'
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
        })
        .on("click", ".tag_p1", function(event) {
            event.preventDefault();

            $(".tag2").animate({
                    opacity: '0.3'
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(".tag_p2").animate({
                    opacity: '0.3'
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(this).animate({
                    opacity: 1
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
            $(".tag1").animate({
                    opacity: '0.9'
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                });
        }).on("click", ".span_button", function(event) {
            event.preventDefault();
            if (!panel_open) {
                var left_panel = document.createElement("div");
                var ul_tag = '<ul>';
                ul_tag += '<li class="index_li">首页</li>';
                ul_tag += '<li class="index_li happy_new">乐活专题</li>';
                ul_tag += '<li class="index_li happy_twitter">最新推荐</li>';
                ul_tag += '<li class="index_li happy_publish">发布乐活</li>';
                ul_tag += '</ul>';
                $(left_panel).append(ul_tag);
                var login_regist_div = '<div class="panel_position">';
                login_regist_div += '<button class="panel_login">注册</button>';
                login_regist_div += '<button class="panel_regist">登录</button>';
                login_regist_div += '</div>';

                $(left_panel).append(login_regist_div).height($(window).height()).width($(window).width() / 2)
                    .css("background-color", "rgb(92, 82, 85)")
                    .css("opacity", 0.9)
                    .css("position", "absolute")
                    .css("top", "0px").attr("id", "panel").attr("class", "panel");
                $(".index").append(left_panel);
                panel_open = true;

            } else {
                $(".panel").show();
            }
            // $("left_panel").css("background-color", "blue");

        }).on("click",".panel_login",function(event){
            event.preventDefault();
            window.location.href="/personal/login";
        }).on("click",".panel_regist",function(event){
            event.preventDefault();
            window.location.href="/personal/login";
        }).on("click",".happy_publish",function(event){
            event.preventDefault();
            window.location.href="/activity/category";
        }).on("click",".happy_new",function(event){
            event.preventDefault();
            window.location.href="/activity/activity_new";
        })
 
        $(document).mouseup(function(e) {
            var _con = $('.panel'); // 设置目标区域
            if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
                $(".panel").hide();
            } 
        }).touchend(function(e) {
            var _con = $('.panel'); // 设置目标区域
            if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
                $(".panel").hide();
            } 
        })

});