/*
created by ivan .
2015-03-25
 */
//活动发布
var img_num = 0;

jQuery(document).ready(function($) {
    var obj = {
        bool_a: false,
        bool_b: false
    };

    // var options = {
    //     editor: document.body, // {DOM Element} [required]
    //     class: '.editor', // {String} class of the editor,
    //     debug: false, // {Boolean} false by default
    //     textarea: '<textarea name="content"></textarea>', // fallback for old browsers
    //     list: ['bold', 'italic', 'underline'] // editor menu list
    // }

    // var editor = new Pen(options);
    // var editor = new Pen('#editor');
    editor = new Dante.Editor({
        el: "#editor",
        upload_url: "/uploads/new.json",
        debug: false
    })
    editor.start();
    publicLib.leftPanel();
    publicLib.activity_b_save();
// publicLib.map_search();
    // var map = new BMap.Map(".activity_vote_a_date"); // 创建地图实例  
    // var point = new BMap.Point(116.404, 39.915); // 创建点坐标  
    // // map.centerAndZoom(point, 15);
    $("body").on("click", ".tag_p2", function(event) {
            event.preventDefault();

        })
        // .on('click', ".add_photo", function(event) {
        //         event.preventDefault();
        //         // $("#btn-upload_pic-back").attr('href', self.back_url);

    //         window.location.href = "/activity/upload"
    //     })
    .on('click', '.add_photo', function(event) {
            event.preventDefault();
            // workaround for android 4.4~4.4.2
            // var syscmd = 'cmd://app/choosefile/file4upload';
            // console.log(syscmd);
            // window.location.href = syscmd;
            $(".hiddenfile input[type=file]").trigger("click");
        })
        .on('click', '#choosefile2', function(event) {
            event.preventDefault();
            // workaround for android 4.4~4.4.2
            if (window.AndroidUploader) {
                if (window.AndroidUploader.upload) {
                    window.AndroidUploader.upload("javascript:android_uploader_callback('<file_id>')");
                } else {
                    alert("当前系统不支持AndroidUploader.upload()");
                };
            } else {
                alert("当前系统不支持Android本地上传功能");
            };
        })
        .on('click', '#do_upload', function(event) {
            event.preventDefault();
            var file = $("#upload_pic-content input[type=file]")[0].files[0];
            if (file) {
                $(this).text("正在上传...");
                // $("#frmUploadPic").submit();
                // change a new method for resize and upload images
                if (window.File && window.FileReader && window.FileList && window.Blob) {
                    self.resizeAndUpload(file);
                } else {
                    alert('The File APIs are not fully supported in this browser.');
                }

            } else {
                alert('请选择照片或者拍照！');
            };
        })
        .on('change', 'input[type=file]', function(event) {
            var file = $("input[type=file]")[0].files[0];
            // $("#preview").empty();
            displayAsImage3(file, "publish_img");

            // $fileinfo = $("#fileinfo");
            // $fileinfo.empty();
            // if (file && file.name) {
            //     $fileinfo.append("<li>名称:<span>" + file.name + "</span></li>");
            // }
            // if (file && file.type) {
            //     $fileinfo.append("<li>类型:<span>" + file.type + " </span></li>");
            // }
            // if (file && file.size) {
            //     $fileinfo.append("<li>大小:<span>" + self.calcSize(file.size) + "</span></li>");
            // }

        }).on('click', '.publish_img > img', function(event) {
            event.preventDefault();
            var img_view = '<img src="' + this.src + '">';
            $("#fullscreen-overlay").html(img_view).fadeIn('fast');
        }).on("click", ".panel_login1", function(event) {
            event.preventDefault();
            window.location.href = "/personal/login";
        }).on("click", ".panel_regist1", function(event) {
            event.preventDefault();
            window.location.href = "/personal/login";
        }).on("click", ".activity_a_btn", function(event) {
            event.preventDefault();
            var type = $(this).data("type");
            // $(".activity_button").hide();
            $(".activity_button").animate({
                    bottom: "-500px"
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                    $(".activity_button").hide();

                });
            var activity_content = ".activity_content_" + type;
            var span_date = "活动有效期:";
            switch (type) {
                case "A":
                    span_date = "聚会活动有效期:";
                    $(".publish_activity_span").html(span_date);

                    $(activity_content).animate({
                            bottom: "0px"
                        },
                        "slow",
                        function() {
                            $(this).removeClass("hidden");

                        });
                    break;
                case "B":
                    span_date = "一起吃饭有效期:";
                    $(".publish_activity_span").html(span_date);

                    $(activity_content).animate({
                            bottom: "0px"
                        },
                        "slow",
                        function() {
                            $(this).removeClass("hidden");

                        });
                    break;
                case "C":
                    span_date = "组织出游有效期:";
                    $(".publish_activity_span").html(span_date);

                    $(activity_content).animate({
                            bottom: "0px"
                        },
                        "slow",
                        function() {
                            $(this).removeClass("hidden");

                        });
                    break;
                case "D":
                    span_date = "投票有效期:";
                    $(".publish_activity_span").html(span_date);

                    $(activity_content).animate({
                            bottom: "0px"
                        },
                        "slow",
                        function() {
                            $(this).removeClass("hidden");

                        });
                    break;

            }
        }).on("click", ".activity_content_button", function(event) {
            event.preventDefault();
            var type = $(this).data("type");
            var activity_content = ".activity_content_" + type;
            $(activity_content).animate({
                    bottom: "-500px"
                },
                "slow",
                function() {
                    $(activity_content).addClass('hidden');

                });
            $(".activity_button").animate({
                    bottom: "0px"
                },
                "slow",
                function() {
                    // $(".btn_cancel").hide();
                    $(".activity_button").show();

                });
        }).on("click", ".activity_vote_add", function(event) {
            event.preventDefault();
            var content = '<li>';
            content += '<p>';
            content += '<textarea class="line-height-1 border_no input_change" type="text" placeholder="投票内容">';
            content += '</textarea>';
            content += '<button type="button" class="btn btn-small activity_a_cancel float_right activity_vote_delete background_color_red_rgb">';
            content += '<i class="fa fa-times" style="color:white">';
            content += '</i>';
            content += '</button>';
            content += '</p>';
            content += '<div class="line2"></div>'
            content += '</li>';
            $(".vote_content").before(content);
        }).on("click", ".activity_vote_delete", function(event) {
            event.preventDefault();
            $(this).parent().parent().empty();
        }).on("click", ".activity_vote_a", function(event) {
            event.preventDefault();
            var type = $(this).data("type");
            switch (type) {
                case "A":
                    show(this, obj.bool_a, "bool_a", obj)

                    break;
                case "B":
                    show(this, obj.bool_a, "bool_a", obj);

                    break;
                case "C":
                    show(this, obj.bool_a, "bool_a", obj)
                    break;
            }
        }).on("click", ".activity_vote_b", function(event) {
            event.preventDefault();
            var type = $(this).data("type");
            switch (type) {
                case "A":
                    show(this, obj.bool_b, "bool_b", obj);
                    break;
                case "B":
                    show(this, obj.bool_b, "bool_b", obj);
                    break;
                case "C":
                    show(this, obj.bool_b, "bool_b", obj);
                    break;
            }
        });



});
var displayAsImage3 = function(file, containerid) {
        if (typeof FileReader !== "undefined") {
            var container = document.getElementById(containerid),
                img = document.createElement("img"),
                reader;
            img_num++;
            var img_id = 'preview_img' + img_num;
            img.id = img_id;
            img.class = 'preview_img';
            img.width = document.body.clientWidth / 3;
            img.height = document.body.clientWidth / 3;
            container.appendChild(img);
            reader = new FileReader();
            reader.onload = (function(theImg) {
                return function(evt) {
                    theImg.src = evt.target.result;
                };
            }(img));
            reader.readAsDataURL(file);
        }
    },
    resizeAndUpload = function(file) {
        var self = this;
        $.canvasResize(file, {
            width: self.new_width || document.body.clientWidth,
            height: 0,
            crop: false,
            quality: 90,
            //rotate: 90,
            callback: function(data, width, height) {
                console.log(data, width, height);
                var mimeString = data.split(',')[0].split(':')[1].split(';')[0];
                console.log(mimeString);
                // $("#upload_pic-content input[type=file]").attr('src', data);
                // 在这里打上水印
                var my_canvas = document.getElementById('my_canvas');
                my_canvas.width = width;
                my_canvas.height = height;
                var ctx = my_canvas.getContext('2d');
                var tmp_img = new Image();
                tmp_img.onload = function(e) {
                    ctx.drawImage(tmp_img, 0, 0);
                    if (self.watermark) { //画水印
                        if (self.watermark_text) { //有第二行的文字，画出来
                            ctx.font = "14px Arial";
                            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                            ctx.fillText(self.watermark_text, 11, 20);
                            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                            ctx.fillText(self.watermark_text, 10, 21);

                            var text_01 = ['日期:' + moment().format('YYYY-MM-DD HH:mm:ss')];
                            text_01.push('上传人:' + $("#login_people_name").val());
                            ctx.font = "14px Arial";
                            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                            ctx.fillText(text_01.join('  '), 11, 40);
                            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                            ctx.fillText(text_01.join('  '), 10, 41);
                        } else {
                            var text_01 = ['日期:' + moment().format('YYYY-MM-DD HH:mm:ss')];
                            text_01.push('上传人:' + $("#login_people_name").val());
                            ctx.font = "14px Arial";
                            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                            ctx.fillText(text_01.join('  '), 11, 20);
                            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                            ctx.fillText(text_01.join('  '), 10, 21);
                        };
                    };

                    // 回显到界面
                    var preview_img = document.getElementById('preview_img');
                    if (mimeString === 'image/png') {
                        preview_img.src = my_canvas.toDataURL('image/png');
                    } else {
                        preview_img.src = my_canvas.toDataURL('image/jpeg', 0.9);
                    };

                    // 上传

                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function(ev) {
                        // document.getElementById('filesInfo').innerHTML = 'Done!';

                        if (ev.target.readyState == 4) {
                            if (ev.target.status == 200) {
                                $("#do_upload").text('上传成功');
                                var res = JSON.parse(ev.target.responseText);

                                // 利用local storage传递数据

                                // self.model[self.field].push(res._id);

                                if (_.isArray(self.model[self.field])) { //如果是数组，就push
                                    if (!self.sub_field) {
                                        self.model[self.field].push(res._id);
                                    } else {
                                        var tmp = {};
                                        tmp[self.sub_field] = res;
                                        tmp['creator'] = {
                                            _id: $("#login_people").val() || null,
                                            people_name: $("#login_people_name").val() || null,
                                        };
                                        self.model[self.field].push(tmp);
                                    };
                                } else { //否则，直接替换－》人员头像
                                    self.model[self.field] = res._id;
                                };

                                localStorage.setItem('upload_model_back', JSON.stringify({
                                    model: self.model
                                }))
                                localStorage.removeItem('upload_model'); //用完删掉

                                // 返回调用页面

                                window.setTimeout(function() { //500毫秒后自动跳转回上一个界面
                                    window.location.href = self.back_url;
                                }, 200);
                            } else {
                                $("#do_upload").text('上传失败');
                            };

                            // console.log(res);
                        };
                        // console.log(ev);
                    };

                    xhr.open('POST', '/gridfs/put', true);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    var post_data = 'data=' + encodeURIComponent(preview_img.src.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
                    // var post_data = 'data=' + data;
                    post_data += '&file_name=' + file.name;
                    post_data += '&file_type=' + file.type;
                    // console.log(post_data);
                    xhr.send(post_data);

                }
                tmp_img.src = data;

            }
        });
    },
    calcSize = function(size) {
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

function show(object, bool, type, obj) {
    if (!bool) {
        $(object).parent().parent().next().removeClass('hidden');
        obj[type] = true;

    } else {
        $(object).parent().parent().next().addClass('hidden');
        obj[type] = false;

    }
}