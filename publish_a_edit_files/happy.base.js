//通用的base funciton



var publicLib = {
    panel_open: false,
    setItem: function(key, value) {
        localStorage.setItem(key, value);
    },
    getItem: function(key, value) {
        var item = localStorage.getItem(key, value);
        return item;
    },
    removeItem: function(key) {
        localStorage.removeItem(key);
    },
    initEditor: function(id, disable_title, title, body) { //init text editor
       var editor = new Dante.Editor({
            el: id,
            // upload_url: "/uploads/new.json",
            debug: false,
            title_placeholder: title,
            body_placeholder: body,
            disable_title: disable_title,
            spell_check: true
        })
        editor.start();
    },
    map_search: function() {
        // 百度地图API功能
        function G(id) {
            return document.getElementById(id);
        }

        // var map = new BMap.Map(".editor_mood");
        // map.centerAndZoom("北京", 12); // 初始化地图,设置城市和地图级别。

        var ac = new BMap.Autocomplete( //建立一个自动完成的对象
            {
                "input": ".activity_vote_a_date",
                // "location": map
                location: '北京'
            });

        ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
        });

        var myValue;
        ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
            G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

            // setPlace();
        });

        // function setPlace() {
        //     map.clearOverlays(); //清除地图上所有覆盖物
        //     function myFun() {
        //         var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
        //         map.centerAndZoom(pp, 18);
        //         map.addOverlay(new BMap.Marker(pp)); //添加标注
        //     }
        //     var local = new BMap.LocalSearch(map, { //智能搜索
        //         onSearchComplete: myFun
        //     });
        //     local.search(myValue);
        // }
    },
    leftPanel: function() {
        $("body").on("click", ".activity_logo_le,.acitivity_logo_le2", function(event) {
            event.preventDefault();
            event.stopPropagation();
            if (!this.panel_open) {
                var left_panel = document.createElement("div");
                var ul_tag = '<ul>';
                ul_tag += '<li class="index_li happy_index">首页</li>';
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
                    .css("z-index", 1000)
                    .css("top", "0px").attr("id", "panel").attr("class", "panel");
                $(".head").append(left_panel);
                this.panel_open = true;

            } else {
                $(".panel").show();
            }
            // $("left_panel").css("background-color", "blue");

        }).on("click", ".panel_login", function(event) {
            event.preventDefault();
            window.location.href = "/personal/login";
        }).on("click", ".panel_regist", function(event) {
            event.preventDefault();
            window.location.href = "/personal/login";
        }).on("click", ".happy_publish", function(event) {
            event.preventDefault();
            window.location.href = "/activity/category";
        }).on("click", ".happy_new", function(event) {
            event.preventDefault();
            window.location.href = "/activity/activity_new";
        }).on("click", ".happy_twitter", function(event) {
            event.preventDefault();
            window.location.href = "/activity/activity_new";
        }).on("click", ".happy_index", function(event) {
            event.preventDefault();
            window.location.href = "/";
        })
        $(document).mouseup(function(e) {
            var _con = $('.panel'); // 设置目标区域
            if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
                $(".panel").hide();
            }
        })


    },
    login: function() { //登录
        var data = {
            username: $("#username").val()
        }
        $.ajax({
            type: "GET",
            url: "./login",
            data: data,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            complete: function(XMLHttpRequest, textStatus) {},
            success: function(data, textStatus) {


            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {}
        });
    },
    regist: function() { //注册
        var data = {
            userName: $("#username").val(),
            passWord: $("#password").val(),
            email: $("#email").val(),
            phone: $("#phone").val() || '',
            wechatName: $("#wechatName").val() || '',
        }
        $.ajax({
            type: "POST",
            url: "./regist",
            data: data,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            complete: function(XMLHttpRequest, textStatus) {},
            success: function(data, textStatus) {


            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {}
        });
    },
    activity_a_save: function() { //活动a保存
        var root = this;
        $("body").on("click", ".activity_a_save", function(event) {
            event.preventDefault();
            // var category = {
            //     'A': 'Picture',
            //     'B': 'Story',
            //     'C': 'Notice',
            // }
            var data = {
                // category: 'happy_a', //乐活活动类别
                // beautiful_pic: beautiful_pic, //美图
                // title: $("#title").val(), //标题
                // content: $("#content").val(), //主题内容
                // content_categroy: content_categroy, //主题类别(图片，好段子，重要通知)
            }

            // switch (content_categroy) {
            //     case 'Picture':
            //         data.picture = picture;
            //         break;
            //     case 'Story':
            //         data.story = story;
            //         break;
            //     case 'Notice':
            //         data.notice = notice;
            //         break;
            // }

            $.ajax({
                type: "POST",
                url: "./activity_a_save",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function(XMLHttpRequest, textStatus) {},
                success: function(data, textStatus) {


                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {}
            });
            // root.setItem("activity_id", activity_id);
            window.location.href = "/activity/publish_save";

        }).on("click", ".activity_a_delete", function(event) {
            event.preventDefault();
            var data = {
                // happy_id: happy_id
            }
            $.ajax({
                type: "POST",
                url: "./activity_a_delete",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function(XMLHttpRequest, textStatus) {},
                success: function(data, textStatus) {
                    window.location.href = "/activity/category";


                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {}
            });
            //activity_id  get by ajax return
            // root.setItem("activity_id", activity_id);

        })
    },
    activity_b_save: function() { //活动b保存

        $("body").on("click", ".activity_b_save", function(event) {
            event.preventDefault();
            var data = {
                // category: 'happy_b', //乐活活动类别
                // beautiful_pic: beautiful_pic, //美图
                // title: $("#title").val(), //标题
                // content: $("#content").val(), //主题内容
                // content_categroy: content_categroy, //主题类别(聚会活动，一起吃饭，组织出游，投票)
            }

            // switch (content_categroy) {
            //     case 'party':
            //         data.party = party;//数组
            //         break;
            //     case 'eat':
            //         data.eat = eat;//数组
            //         break;
            //     case 'travel':
            //         data.travel = travel;//数组
            //         break;
            //     case 'vote':
            //         data.vote = vote;//数组
            //         break;
            // }
            $.ajax({
                type: "POST",
                url: "./activity_b_save",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function(XMLHttpRequest, textStatus) {},
                success: function(data, textStatus) {
                    window.location.href = "/activity/publish_save";


                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {}
            });

        }).on("click", ".activity_b_delete", function(event) {
            event.preventDefault();
            var data = {
                // happy_id: happy_id
            }
            $.ajax({
                type: "POST",
                url: "./activity_b_delete",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function(XMLHttpRequest, textStatus) {},
                success: function(data, textStatus) {

                    window.location.href = "/activity/category";

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {}
            });
        })
    },
    activity_publish: function() { //activity publish @by activity_id
        var data;

        $("body").on("click", ".activity_publish", function(event) {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "./activity_publish",
                data: data,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function(XMLHttpRequest, textStatus) {},
                success: function(data, textStatus) {

                    window.location.href = "/activity/category";

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {}
            });
            window.location.href = "/activity/publish_save";

        }).on("click", ".activity_b_delete", function(event) {
            event.preventDefault();
            window.location.href = "/activity/category";
        })
    },
    activity_contact: function() { //activity contact 活动联系组
        //我加入的联系组，我创建的联系组
        //date-format: 1.联系组类别
        //   2.联系组id
        //   3.contact detail
        $.ajax({
            type: "GET",
            url: "./activity_contact",
            data: data,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            complete: function(XMLHttpRequest, textStatus) {},
            success: function(data, textStatus) {

                console.log(data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {}
        });
        $("body").on("click", ".contact_save", function(event) { //联系组保存
                event.preventDefault();
                var data = {
                    contact_group_id: contact_group_id,
                    contact_people_id: contact_people_id,
                }
                $.ajax({
                    type: "POST",
                    url: "./contact_save",
                    data: data,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    complete: function(XMLHttpRequest, textStatus) {},
                    success: function(data, textStatus) {

                        console.log(data);

                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {}
                });
                window.location.href = "/activity/publish_save";

            })
            .on("click", ".contact_exit", function(event) { //退出该联系组
                event.preventDefault();
                $.ajax({
                    type: "POST",
                    url: "./contact_exit",
                    data: data,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    complete: function(XMLHttpRequest, textStatus) {},
                    success: function(data, textStatus) {

                        window.location.href = "/activity/category";

                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {}
                });
                window.location.href = "/activity/category";
            })
    }
}

function toast(flag, title) {
    if (!flag || flag == 'show') {
        $("#fullscreen-overlay").fadeIn(100);
        $("#toast").fadeIn(100);
    } else if (flag == 'hide') {
        $("#toast").fadeOut(100);
        $("#fullscreen-overlay").fadeOut(100);
    };
    if (title) {
        $("#toast_title").html(title);
    } else {
        $("#toast_title").html('加载中');
    };
}

function show_msg(msg, type, auto_hide_seconds, msg_title) {
    $("#alert_box").removeClass();
    if (msg_title) {
        $("#alert_box #msg_title").html(msg_title);
    };
    $("#alert_box #msg_body").html(msg);
    var type_class = (!type) ? 'info' : type;
    $("#alert_box").addClass('alert alert-' + type_class).fadeIn(100);
    if (parseInt(auto_hide_seconds) > 0) {
        window.setTimeout(function() {
            hide_msg();
        }, parseInt(auto_hide_seconds) * 1000);
    };
}

function hide_msg() {
    $("#alert_box").fadeOut(100);
}

function show_msg_big(msg_title, type, icon, auto_hide_seconds) {
    $("#alert_box_big").removeClass();
    if (msg_title) {
        $("#alert_box_big #msg_title").html(msg_title);
    };
    $("#alert_box_big #msg_icon").removeClass().addClass('fa fa-' + icon);

    var type_class = (!type) ? 'info' : type;
    $("#alert_box_big").addClass('alert alert-' + type_class).fadeIn(100);

    if (parseInt(auto_hide_seconds) > 0) {
        window.setTimeout(function() {
            hide_msg_big();
        }, parseInt(auto_hide_seconds) * 1000);
    };
}

function hide_msg_big() {
    $("#alert_box_big").fadeOut(100);
}

function show_confirm(title, msg, ok_cb, cancel_cb) {
    var $dlg = $("#dlg_confirm");
    if (title) { //显示标题
        $dlg.find("#dlg_confirm_header").show();
        $dlg.find("#dlg_confirm_title").html(title);
    } else {
        $dlg.find("#dlg_confirm_header").hide();
    };
    $dlg.find("#dlg_confirm_body").html(msg);
    $dlg.modal('show');
    $dlg.off('click')
        .on('click', '#btn_confirm_ok', function(event) {
            event.preventDefault();
            // console.log('message: ok');
            $dlg.modal('hide');
            if (ok_cb && typeof ok_cb == 'function') {
                ok_cb();
            };
        })
        .on('click', '#btn_confirm_cancel', function(event) {
            event.preventDefault();
            // console.log('message: cancel');
            $dlg.modal('hide');
            if (cancel_cb && typeof cancel_cb == 'function') {
                cancel_cb();
            };
        });
}

function show_prompt(title, default_value, callback) {
    var $dlg = $("#dlg_prompt");
    if (title) { //显示标题
        $dlg.find("#dlg_prompt_header").show();
        $dlg.find("#dlg_prompt_title").html(title);
    } else {
        $dlg.find("#dlg_prompt_header").hide();
    };
    if (default_value != null) { //设置默认值
        $dlg.find("#dlg_prompt_input").val(default_value);
    };
    $dlg.modal('show');
    $dlg.off('click')
        .on('click', '#btn_prompt_ok', function(event) {
            event.preventDefault();
            // console.log('message: ok');
            $dlg.modal('hide');
            if (callback && typeof callback == 'function') {
                callback($dlg.find("#dlg_prompt_input").val());
            };
        })
        .on('click', '#btn_prompt_cancel', function(event) {
            event.preventDefault();
            // console.log('message: cancel');
            $dlg.modal('hide');
            if (callback && typeof callback == 'function') {
                callback(null);
            };
        });
}

function calcSize(size) {
    if (size < 1024) {
        return $.sprintf('%0.2f B', size);
    } else if (size >= 1024 && size < 1048576) { //1024 * 1024
        return $.sprintf('%0.2f KB', size / 1024);
    } else if (size >= 1048576 && size < 1073741824) { //1024^3
        return $.sprintf('%0.2f MB', size / 1048576);
    } else if (size >= 1073741824) {
        return $.sprintf('%0.2f GB', size / 1073741824);
    };
};

//设置textarea的自动增高
function auto_height_textarea() {
    $('textarea')
        .css('min-height', 70)
        .css('max-height', 400)
        .css('overflow-y', 'hidden')
        .on('input', function() {
            this.style.height = this.scrollHeight + 'px'
        })
        .on('propertychange', function() {
            this.style.height = this.scrollHeight + 'px'
        })
        .trigger('input')
}

function startWith(str1, str2) {
    var re = /./;
    re.compile('^' + str2);
    return re.test(str1);
}

function endWith(str1, str2) {
    var re = /./;
    re.compile(str2 + '$');
    return re.test(str1);
}

function containWith(str1, str2) {
    var re = /./;
    re.compile(str2);
    return re.test(str1);
}

function getFileIconByContentType(content_type) {
    var ret = ['<i class="fa fa-file'];
    if (startWith(content_type, 'image')) {
        ret.push('-image-o');
    } else if (startWith(content_type, 'audio')) {
        ret.push('-audio-o');
    } else if (startWith(content_type, 'video')) {
        ret.push('-video-o');
    } else if (containWith(content_type, 'word')) {
        ret.push('-word-o');
    } else if (containWith(content_type, 'excel')) {
        ret.push('-excel-o');
    } else if (containWith(content_type, 'powerpoint')) {
        ret.push('-powerpoint-o');
    } else if (containWith(content_type, 'zip')) {
        ret.push('-zip-o');
    } else if (containWith(content_type, 'pdf')) {
        ret.push('-pdf-o');
    } else {
        ret.push('-o');
    };
    ret.push('"></i>');
    return ret.join('');
}

function cr2br(data) {
    data += '';
    var escape = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    };
    var badChars = /[&<>"'`]/g;

    function escapeChar(chr) {
        return escape[chr] || "&amp;";
    }
    var ret = (data) ? data.replace(badChars, escapeChar) : ''; //把html专移调
    ret = ret.replace(/\n/g, '<br>');
    return ret;
}



jQuery(document).ready(function($) {
    auto_height_textarea();
    $("#fullscreen-overlay").on('click', function(event) {
        event.preventDefault();
        $("#fullscreen-overlay").html('').fadeOut('fast');
    });

});