var app = angular.module('SMCERApp', ['SMCER']);
app.run(['$rootScope', '$state', '$stateParams',
function ($rootScope, $state, $stateParams) {

    // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
    FastClick.attach(document.body);

    // Set some reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // GLOBAL APP SCOPE
    // set below basic information
    $rootScope.app = {
        name: 'SMCER', 
        author: 'TCC UNIFIEO EGCNA10 - 2015',
        description: 'Sistema para Monitoramento do Consumo Elétrico Residêncial',
        version: '1.0',
        year: ((new Date()).getFullYear()),
        isMobile: (function () {
            var check = false;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                check = true;
            };
            return check;
        })(),
        layout: {
            isNavbarFixed: true,
            isSidebarFixed: false,
            isSidebarClosed: false,
            isFooterFixed: false,
            theme: 'theme-3',
            logo: 'assets/images/logo.png',
        }
    };

}]);

// translate config
app.config(['$translateProvider',
function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/i18n/',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('pt_BR');

}]);

// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;

}]);