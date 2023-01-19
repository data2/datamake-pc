$(function() {
    // ajax 同步 全局设置
    $.ajaxSetup({
        async: true
    });
    refreshPc();
    call();
    

    // init feather icons
    // feather.replace();

    // init tooltip & popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    //page scroll
    $('a.page-scroll').bind('click',
        function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                },
                1000);
            event.preventDefault();
        });

    //toggle scroll menu
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        //adjust menu background
        if (scroll >= 100) {
            $('.sticky-parallex').removeClass('navbar-dark').addClass('navbar-light').addClass('bg-white');
            $('.btn-signup').removeClass('btn-secondary').addClass('btn-primary');
            $('.navbar-toggler').removeClass('text-white').addClass('text-dark');
        } else {
            $('.sticky-parallex').removeClass('navbar-light').removeClass('bg-white').addClass('navbar-dark');
            $('.btn-signup').removeClass('btn-primary').addClass('btn-secondary');
            $('.navbar-toggler').removeClass('text-dark').addClass('text-white');
        }

        // adjust scroll to top
        if (scroll >= 600) {
            $('.scroll-top').addClass('active');
        } else {
            $('.scroll-top').removeClass('active');
        }
        return false;
    });

    // scroll top top
    $('.scroll-top').click(function() {
        $('html, body').stop().animate({
                scrollTop: 0
            },
            1000);
    });

    /**Theme switcher - DEMO PURPOSE ONLY s*/
    $('.switcher-trigger').click(function() {
        $('.switcher-wrap').toggleClass('active');
    });
    $('.color-switcher ul li').click(function() {
        var color = $(this).attr('data-color');
        $('#theme-color').attr("href", "css/" + color + ".css");
        $('.color-switcher ul li').removeClass('active');
        $(this).addClass('active');
    });


    $('#loginModal .btn').click(function() {
        var email = $('#email').val();
        var password = $('#password').val();
        var loginerrmsg = $('#loginerrmsg');

        var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!pattern.test(email)) {
            loginerrmsg.text('邮箱格式不正确');
            loginerrmsg.show();
            return false;
        }

        loginerrmsg.hide();

        $.ajax({
            url: "https:/datamake.com.cn/login/",
            data: {
                'email': email,
                'password': password,
                'channel': 'pc'
            },
            dataType: "json",
            type: "POST",
            async: false,
            success: function(data) {
                if (data.result == 0) {
                    saveCache(data.msg);
                    // $('#loginModal').modal('toggle');
                    refreshPc();
                } else {
                    loginerrmsg.text(data.msg);
                    loginerrmsg.show();
                }
            },
            error: function() {
                alert("请求超时，请重试");
            }

        });

    });

    $('#signupModal .btn').click(function() {
        var name = $('#s-name').val();
        var email = $('#s-email').val();
        var password = $('#s-password').val();
        var errmsg = $('#errmsg');

        if (name.length == 0 || email.length == 0 || password == 0) {
            errmsg.text('必填项不能为空');
            errmsg.show();
            return false;
        }

        var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!pattern.test(email)) {
            errmsg.text('邮箱格式不正确');
            errmsg.show();
            return false;
        }

        var regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        if (password == "") {
            errmsg.text('密码不能为空');
            errmsg.show();
            return false;
        }
        if (password.length < 6 || password.length > 10) {
            errmsg.text('密码格式错误：长度需要在6到10位');
            errmsg.show();
            return false;
        }
        if (!regExp.test(password)) {
            errmsg.text('密码格式错误：需包含大小写字母和数字');
            errmsg.show();
            return false;
        }

        errmsg.hide();

        $.ajax({
            url: "https:/datamake.com.cn/register/",
            data: {
                'email': email,
                'password': password,
                'name': name,
                'channel': 'pc'
            },
            type: "POST",
            dataType: "json",
            async: false,
            success: function(data) {
                if (data.result == 0) {
                    alert('注册成功');
                    // $('#registologin').click();
                    // $('#email').val(email);
                } else {
                    errmsg.text(data.msg);
                    errmsg.show();
                }

            },
            error: function() {
                alert("请求超时，请重试");
            }

        });
    });

    $('#quickSignupModal .btn').click(function() {
        var email = $('#quickEmail').val();
        var password = $('#s-password').val();

        var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!pattern.test(email)) {
            alert('邮箱格式不正确');
            return;
        }

        var regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        if (password == "") {
            alert("密码不能为空");
            return;
        }
        if (password.length < 6 || password.length > 10) {
            alert("密码格式错误：长度需要在6到10位");
            return;
        }
        if (!regExp.test(password)) {
            alert("密码格式错误：需包含大小写字母和数字");
            return;
        }

        $.ajax({
            url: "/register",
            data: {
                'email': email,
                'password': password,
                'name': email
            },
            type: "POST",
            dataType: "json",
            success: function(data) {
                if (data.result == 0) {
                    alert('注册成功');
                } else {
                    alert(data.msg);
                }
            },
            error: function() {
                alert("请求超时，请重试");
            }

        });
    });


    function saveCache(data){
        localStorage.setItem('cc',data);
    }

    
    //刷新登录状态
    function refreshPc(msg) {
        var cookie = localStorage.getItem('cc');
        if (cookie == undefined || cookie == ''){
            return;
        }
        var email = cookie.split("|")[0];
        if (email.length != 0) {
            $(".navbar-nav").children(':last-child').find('a').text(email);
        }else{
            $(".navbar-nav").children(':last-child').find('a').text("登陆");
        }
    }



    function bottom(data) {
        if (data.result == 0 && data.msg != null) {
            var result = '';
            $.each(data.msg,
                function(index, content) {
                    if (content['%'] > 0) {
                        result = result + '&nbsp;&nbsp;<span>' + content['name'] + '&nbsp;&nbsp;' + content['zhishu'] + '</span>' + ' <span style="color:red;">&nbsp;&nbsp;' + content['%'] + '% </span>|';
                    } else {
                        result = result + '&nbsp;&nbsp;<span>' + content['name'] + '&nbsp;&nbsp;' + content['zhishu'] + '</span>' + ' <span style="color:green;">&nbsp;&nbsp;' + content['%'] + '% </span>|';
                    }
                });
            $('#bottom_msg').html(result.substring(0, result.length - 1));
        }

    }

    function call(data) {
        $.getJSON('https://datamake.com.cn/getRunMsg/', bottom);
    }

    setTimeout(function fn() {
            setTimeout(call, 30000);
        },
        30000);


});