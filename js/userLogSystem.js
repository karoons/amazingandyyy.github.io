
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
    };
	
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
            } else {
                instance.onLogout();
            }
        });
        // LinksRef = firebase.child('links')
        //         linksRef.on('value', function(snapshot) {
        //             var links = snapshot.val();
        //             var preparedLinks = [];
        //             for (var url in links) {
        //                 if (links.hasOwnProperty(url)) {
        //                     preparedLinks.push({
        //                         title: links[url].title,
        //                         url: atob(url)
        //                     })
        //                     getSubmitters(url, links[url].users);
        //                 }
        //             }
        //             instance.onLinksChanged(preparedLinks);
        //         });

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

   
});