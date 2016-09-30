/*global vex*/

angular.module('adviseMyStyleCms', ['ui.bootstrap','ui.router','ngAnimate','ui.tinymce','LocalForageModule']);

angular.module('adviseMyStyleCms').config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider.state('login', {
        url: '/login',
        views:{
            'cover@':{
                controller:'LoginCtrl',
                templateUrl:'partial/login/login.html'
            }
        }
    });

    $stateProvider.state('app', {
        url: '/',
        abstract:true,
        views:{
            'nav@':{
                controller:'NavigationCtrl',
                templateUrl:'partial/navigation/navigation.html'
            },
            'sidebar@':{
                controller:'SidebarCtrl',
                templateUrl: 'partial/sidebar/sidebar.html'
            }
        }

    });

    $stateProvider.state('app.home', {
        url: 'home',
        views:{
            'main@':{
                controller:'HomeCtrl',
                templateUrl:'partial/home/home.html'
            }
        }
    });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/login');

    $httpProvider.interceptors.push('requestInterceptorService');

});

angular.module('adviseMyStyleCms').run(function($rootScope) {

    vex.defaultOptions.className = 'vex-theme-default';
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.currentState = toState.name;
    });

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    /*tinymce options*/
    $rootScope.tinymceOptions = {
        setup: function(editor) {
            editor.on("init", function() {
                "use strict";

            });
            editor.on("click", function() {

            });
        },
        forced_root_block : false,
        force_br_newlines : true,
        force_p_newlines : false,
        plugins:'paste link table',
        paste_as_text: true,
        paste_auto_cleanup_on_paste : true,
        paste_remove_styles: true,
        paste_remove_styles_if_webkit: true,
        paste_strip_class_attributes: 'all'
    };

});
