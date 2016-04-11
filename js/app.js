function cvVolunteerUpdate() {
    //				var	event_name = document.getElementsBySelector(".cv_volunteer_form_editor").find('#event_name').val(),
    //       	event_location = document.getElementsBySelector(".cv_volunteer_form_editor").find('#event_location').val(),
    //        event_date = document.getElementsBySelector(".cv_volunteer_form_editor").find('#event_date').val(),
    //        event_host = document.getElementsBySelector(".cv_volunteer_form_editor").find('#event_host').val(),
    //        event_diary = document.getElementsBySelector(".cv_volunteer_form_editor").find('#event_diary').val();		
    //				alert(event_name, event_location, event_date, event_host, event_diary);
    var event_name = getElementsBySelector('.cv_volunteer_form_editor').value;
};

$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 800);
                return false;
            }
        }
    });
});

jQuery(document).ready(function() {
    var offset = 1000;
    var duration = 300;
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(200);
        } else {
            jQuery('.back-to-top').fadeOut(200);
        }
    });

    jQuery('.back-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    })
});

$(document).ready(function() {



    $('.navbar-toggle').click(function() {
        $('.menu-box').toggleClass('open');
    });

    $.getJSON("js/json/advisors.json", function(json) {

        var html = "";

        for (var i = 0; i < 9; i++) {
            var val = json[Math.floor(Math.random() * json.length)];
            html += "<div class='card card-w card-advisor'><div class='profile-img'><img src='" + "css/images/team/advisors/default-profile" + Math.floor(Math.random() * 5 + 1) + ".jpg" + "'/></div><br><h3 class='adviser-name'>" + val.name + "</h3><h5 class='advisor-background'><i class='fa fa-map-marker'></i> " + val.background + "</h5></div>";

        }

        //        json.forEach(function(val) {});

        html += "<a href='#'><div class='card card-advisor-more'><div class='profile-img'><i class='fa fa-hand-peace-o card-advisor-more-i'></i></div><br><h3 class='adviser-name'>选择你的顾问</h3><h5 class='advisor-background'>你的目标学校</h5></div></a>"

        $('.advisor-row').html(html);

    });

    $.getJSON("js/json/team.json", function(json) {

        var html = "";

        for (var i = 0; i < 6; i++) {
            var val = json[i];
            var nameAbbr = val.name.toLowerCase().split(' ');
            html += "<div class='col-xs-12 col-sm-4 col-lg-4 team-container'><div class='card-teamMember'><div class='profile-img profile-img-teamMember'><img src='css/images/team/members/" + nameAbbr.join('-') + "-profile-img.png'></div><h4>" + val.name + "</h4><h5>" + val.title + "</h5><div class='profile-innerDiv'><h3>" + val.name + "</h3><p>" + val.introduction + "</p></div><div class='teamMember-more' title='查看更多关于我' data-toggle='modal' data-target='." + nameAbbr.join('-') + "-modal'>更多关于</div></div><div class='modal fade " + nameAbbr.join('-') + "-modal'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-body'><button type='button' class='close' data-dismiss='modal' aria-label='Close' aria-hidden='true'><span></span><span></span></button><div class='profile-img profile-img-teamMember'><img src='css/images/team/members/" + nameAbbr.join('-') + "-profile-img.png'></div><h4>" + val.name + "</h4><h5>" + val.title + "</h5><p>" + val.story + "<hr /><br />" + val.motto + "</p></div></div></div></div></div>";
        }

        for (var i = 6; i < json.length; i++) {
            var val = json[i];
            var nameAbbr = val.name.toLowerCase().split(' ');
            html += "<div class='col-xs-12 col-sm-4 col-lg-4 team-container'><div class='card-teamMember'><div class='profile-img profile-img-teamMember'><img src='css/images/team/members/" + nameAbbr.join('-') + "-profile-img.png'></div><h4>" + val.name + "</h4><h5>" + val.title + "</h5><div class='profile-innerDiv'><h3>" + val.name + "</h3><p>" + val.introduction + "</p></div><div class='teamMember-more' title='查看更多关于我' data-toggle='modal' data-target='." + nameAbbr.join('-') + "-modal'>更多关于</div></div><div class='modal fade " + nameAbbr.join('-') + "-modal'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-body'><button type='button' class='close' data-dismiss='modal' aria-label='Close' aria-hidden='true'><span></span><span></span></button><div class='profile-img profile-img-teamMember'><img src='css/images/team/members/" + nameAbbr.join('-') + "-profile-img.png'></div><h4>" + val.name + "</h4><h5>" + val.title + "</h5><p>" + val.story + "<hr /><br />" + val.motto + "</p></div></div></div></div></div>";
        }

        $('.team-row').html(html);
    });

    $('.more-advisor').bind('touchstart touchend', function(e) {
        e.preventDefault();
        $(this).toggleClass('hover_effect');
    });

});

//here are many function individuals we use in the entire system


function YeahEducation(fbname) {

    var firebase = new Firebase('https://' + fbname + '.firebaseio.com/');
    this.firebase = firebase;
    var linksRef = firebase.child('links');
    var usersRef = firebase.child('users');
    var instance = this;

    this.login = function(email, password) {
        firebase.authWithPassword({
            email: email,
            password: password
        }, function(error, authData) {
            if (error) {
                $('.loginForm_error').show().html(error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $('#logForm').modal('hide');
            }
        });
    };

    this.signup = function(alias, email, password) {
        firebase.createUser({
            email: email,
            password: password
        }, function(error, userData) {
            if (error) {
                $('.signupForm_error').show().html(error);
            } else {
                console.log('Successfully created user account with uid:', userData.uid);
                $('#logForm').modal('hide');
                // instance.auth = userData;
                usersRef.child(userData.uid).set({
                    alias: alias
                }, function(error) {
                    if (error) {
                        instance.onError(error);
                    } else {
                        instance.login(email, password);
                    }
                });
            }
        });
    };

    this.logout = function() {
        firebase.unauth();
        window.location.href = "/index.html"
    };

    this.cvVolunteerPost = function(event_name, event_location, event_date, event_host, event_diary) {
        var authData = firebase.getAuth();
        var newVolunteerEvent = usersRef.child(authData.uid)
            .child('Resume')
            .child('volunteer')
            .push({
                event_name: event_name,
                event_location: event_location,
                event_date: event_date,
                event_host: event_host,
                //                event_participant: event_participant,
                //                event_doc: event_doc,
                event_diary: event_diary
            });
        usersRef.child(authData.uid)
            .child('Resume')
            .child('volunteer')
            .child(newVolunteerEvent.key())
            .update({
                event_id: newVolunteerEvent.key()
            });
        console.log('add Volunteer Event:' + newVolunteerEvent.key())
    };

    this.volunteereditorClicked = function(volunteerEvent_uid) {
        console.log('this is the eventeditor of event' + volunteerEvent_uid);
        var reume_item_id = "resume_item_" + volunteerEvent_uid;
        console.log(reume_item_id);
        var authData = firebase.getAuth();
        var volunteerEventSingleContent = [];
        //					volunteerEventSingleContent.empty();

        usersRef.child(authData.uid).child('Resume').child('volunteer').child(volunteerEvent_uid).once('value', function(snapshot) {
            var volunteerEventSingleContentItem = snapshot.val();
            instance.onVolunteereditor(volunteerEventSingleContentItem);
        });
    }

    //
    //	{event_name: volunteerEventSingleContentItem.event_name,
    //                event_location2: volunteerEventSingleContentItem.event_location,
    //                event_date: volunteerEventSingleContentItem.event_date,
    //                event_host: volunteerEventSingleContentItem.event_host,
    //                event_participant: volunteerEventSingleContentItem.event_participant,
    //                event_doc: volunteerEventSingleContentItem.event_doc,
    //                event_diary: volunteerEventSingleContentItem.event_diary,
    //																event_id: volunteerEventSingleContentItem.event_id}


    // overrideable event functions
    this.onLogin = function(user) {};
    this.onLogout = function() {};
    this.onError = function(error) {
        console.log('Errorrrr:', error);
    };

    //setup long-running firebase listeners 4-3 1:13
    this.start = function() {

        // onAuth is really inportant!!!
        firebase.onAuth(function(authData) {
            if (authData) {
                // usersRef = firebase.child('users');
                // firebase.child('users').child(authData.uid) -->
                usersRef.child(authData.uid).once('value', function(snapshot) {
                    instance.user = snapshot.val();
                    instance.onLogin(instance.user); // extremely important!!!
                });

                usersRef.child(authData.uid).child('Resume').on('value', function(snapshot) {
                    var volunteerEvents = snapshot.child('volunteer').val();
                    console.log(volunteerEvents);
                    var ResumeOfVolunteer = [];
                    for (var volunteerEvent in volunteerEvents) {
                        ResumeOfVolunteer.push(volunteerEvents[volunteerEvent]);
                    }
                    console.log(ResumeOfVolunteer.length);
                    console.log(ResumeOfVolunteer);
                    instance.onVolunteerChanged(ResumeOfVolunteer);
                });
            } else {
                instance.onLogout();
            }
        });

    };

};


$(document).ready(function() {

    var YE = new YeahEducation('yeaheducation');

    YE.onLogin = function() {
        $('#userlog-y-out').show();
        $('#nav-list-login').show();
        $('#userlog-y').hide();
        $('#nav-list-logout').hide();
    };

    YE.onLogout = function() {
        $('#userlog-y').show();
        $('#nav-list-logout').show();
        $('#nav-list-login').hide();
        $('#userlog-y-out').hide();
    };

    YE.onVolunteerChanged = function(volunteerEvents) {
        $('.resume_list').empty();

        volunteerEvents.map(function(volunteerEvent) {
            var volunteerEventElement = "<div class='resume_item resume_item_" + volunteerEvent.event_id + "'>" +
                "<name>" + volunteerEvent.event_name + "</name>" +
                "<date>" + volunteerEvent.event_date + "</date>" +
                "<br>" +
                "<location><i class='fa fa-map-marker'></i>&nbsp;" + volunteerEvent.event_location + "</location>" +
                "<organization><i class='fa fa-university'></i>&nbsp;" + volunteerEvent.event_host + "</organization>" +
                "<br>" +
                "<description>" + volunteerEvent.event_diary + "</description>" + "<button class='resume_edit_tag' event-uid='" + volunteerEvent.event_id + "' data-toggle='modal' data-target='#volunteerEventeditor_" + volunteerEvent.event_id + "'>更新信息</button>";

            $('.resume_list').append(volunteerEventElement);

        });
        $('.resume_list').append("<div class='dashboard-more' id='dashboard-more-cv-v'>新增</div>");
        $('#dashboard-more-cv-v').click(function() {
            $('#dashboard-more-trigger-div-cv-v').modal('show');
        });
        $('.resume_edit_tag').click(function() {
            var event_uid = this.getAttribute('event-uid');
            YE.volunteereditorClicked(event_uid);
        });

    };

    YE.onVolunteereditor = function(volunteerEventSingleContent) {

        function cvVolunteerUpdate() {

            var event_name = $("cv_volunteer_form_editor").find('#event_name').val(),
                event_location = $("cv_volunteer_form_editor").find('#event_location').val(),
                event_date = $("cv_volunteer_form_editor").find('#event_date').val(),
                event_host = $("cv_volunteer_form_editor").find('#event_host').val(),
                event_diary = $("cv_volunteer_form_editor").find('#event_diary').val();
            alert(event_name, event_location, event_date, event_host, event_diary);
        };

        var volunteereditorModals = "<div class='modal fade' class='volunteerEventeditor' id='volunteerEventeditor_" + volunteerEventSingleContent.event_id + "' role='dialog' aria-labelledby='myModalLabel'>" +
            "<div class='modal-dialog modal-lg' role='document'>" +
            "<div class='modal-content'>" +
            "<div class='modal-body'>" +
            "<button type='button' class='close' data-dismiss='modal' aria-label='Close' aria-hidden='true'>" +
            "<span></span><span></span>" +
            "</button>" +
            "<br>" +
            "<div class='logForm-logo'>" +
            "<h1><i class='fa fa-hand-peace-o' style='font-size: 2em; color: #34B3A0; margin-bottom: 10px;'></i><br></h1>" +
            "</div>" +
            "<div class='margin20px'></div>" +
            "<div class='' id='cv_volunteer_form_editor' style='min-width: 300px'>" +
            "<form class='info-list-form' onsubmit='cvVolunteerUpdate()'>" +
            "<div class='row'>" +
            "<div class='col-md-6'>" +
            "<div class='form-group'>" +
            "<label for='event_name'>活动名称</label>" +
            "<input type='text' class='form-control' id='event_name' placeholder='活动名称' value='" + volunteerEventSingleContent.event_name + "'>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-6'>" +
            "<div class='row'>" +
            "<div class='col-md-6'>" +
            "<div class='form-group'>" +
            "<label for='event_date'>服务日期(mm/dd/yyyy)</label>" +
            "<input type='date' class='form-control' id='event_date' value='" + volunteerEventSingleContent.event_date + "'/>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-6'>" +
            "<div class='form-group'>" +
            "<label for='event_location'>服务地点</label>" +
            "<input type='text' class='form-control' id='event_location' placeholder='服务地点' value='" + volunteerEventSingleContent.event_location + "'/>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-6'>" +
            "<div class='form-group'>" +
            "<label for='event_host'>主办方</label>" +
            "<input type='text' class='form-control' id='event_host' placeholder='Organization Oficial Full Name' value='" + volunteerEventSingleContent.event_host + "'>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-6'>" +
            "<div class='row'>" +
            "<div class='col-md-6'>" +
        //                                                                            "<div class='form-group'>"+
        //                                                                                "<label for='event_participant'>参与身分</label>"+
        //                                                                                "<br>"+
        //                                                                                "<label id='label_select'>"+
        //                                                                                    "<select id='event_participant'>"+
        //                                                                                        "<option value='' disabled selected>-- 请选择 --</option>"+
        //                                                                                        "<option id='event_participant_editor'	 value='主办者'>主办者</option>"+
        //                                                                                        "<option id='event_participant_editor' value='小组长'>小组长</option>"+
        //                                                                                        "<option id='event_participant_editor' value='参与者'>参与者</option>"+
        //                                                                                    "</select>"+
        //                                                                                "</label>"+
        //                                                                            "</div>"+
        "</div>" +
            "<div class='col-md-6'>" +
        //                                                                            "<div class='form-group'>"+
        //                                                                                "<label for='event_doc'>照片/档案</label>"+
        //                                                                                "<input type='file' class='form-control' id='event_doc' data-input='false' data-iconName='glyphicon glyphicon-inbox' data-buttonText='上传附加档案.' style='height: 40px; outline: none;' multiple>"+
        //                                                                            "</div>"+
        "</div>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-12'>" +
            "<div class='form-group'>" +
            "<label for='event_diary'>活动描述/日记</label>" +
            "<textarea type='text' class='form-control' id='event_diary' placeholder='DVC, Foothill College...' rows='6' cols='50'>'" + volunteerEventSingleContent.event_diary + "'</textarea>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<button type='submit' class='btn btn-default'>更新信息</button>" +
            "</form>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

        $('.resume_list').append(volunteereditorModals);
        if ($('#event_participant_editor').text() == "小组长") {
            $(this).prop('selected', true);
        };


    };

    $('#userlogout').click(function() {
        YE.logout();
        console.log('Logged out');
        return false;
    });

    $('#loginForm form').submit(function(event) {
        var email = $(this).find('#login_email').val(),
            password = $(this).find('#login_password').val();
        YE.login(email, password);
        return false;
    });

    $('#signupForm form').submit(function(event) {
        var alias = $(this).find('#signup_name').val(),
            email = $(this).find('#signup_email').val(),
            password = $(this).find('#signup_password').val(),
            passwordConfirm = $(this).find('#signup_password_confirmed').val();
        if (password === passwordConfirm) {
            YE.signup(alias, email, password);
            console.log(alias, email, password);
        } else {
            $('#signup_password_confirmed').css({
                'border': '1px red solid'
            });
            $('.signupForm_error').show().html('两个密码不相同! :(');
        }
        return false;
    });

    YE.start();

    $('#cv_volunteer_form form').submit(function(event) {
        var event_name = $(this).find('#event_name').val(),
            event_location = $(this).find('#event_location').val(),
            event_date = $(this).find('#event_date').val(),
            event_host = $(this).find('#event_host').val(),
            //            event_participant = $(this).find('#event_participant option:selected').val(),
            //            event_doc = $(this).find('#event_doc').val(),
            event_diary = $(this).find('#event_diary').val();
        console.log('ssss');
        YE.cvVolunteerPost(event_name, event_location, event_date, event_host, event_diary);
        $('#cv_volunteer_form').find(':input').val('');
        $('#dashboard-more-trigger-div-cv-v').modal('hide');
        return false;
    });




});