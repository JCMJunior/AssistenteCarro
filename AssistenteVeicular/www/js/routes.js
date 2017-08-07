angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.home'
      2) Using $state.go programatically:
        $state.go('tabsController.home');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page16
      /page1/tab3/page16
      /page1/tab2/page16
  */
  .state('tabsController.home', {
    url: '/page16',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      },
      'tab3': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      },
     'tab2': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('cadastrarVeCulo', {
    url: '/page14',
    templateUrl: 'templates/cadastrarVeCulo.html',
    controller: 'cadastrarVeCuloCtrl'
  })

  .state('minhaConta', {
    url: '/page9',
    templateUrl: 'templates/minhaConta.html',
    controller: 'minhaContaCtrl'
  })

  .state('alterarDados', {
    url: '/page17',
    templateUrl: 'templates/alterarDados.html',
    controller: 'alterarDadosCtrl'
  })

  .state('meuVeCulo', {
    url: '/page20',
    templateUrl: 'templates/meuVeCulo.html',
    controller: 'meuVeCuloCtrl'
  })

  .state('hodMetro', {
    url: '/page3',
    templateUrl: 'templates/hodMetro.html',
    controller: 'hodMetroCtrl'
  })

  .state('tabsController.manutenEs', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/manutenEs.html',
        // controller: 'manutenEsCtrl'
        controller: 'manutencaosCtrl'
      }
    }
  })

  .state('tabsController.calculadoraFlex', {
    url: '/page11',
    views: {
      'tab2': {
        templateUrl: 'templates/calculadoraFlex.html',
        controller: 'calculadoraFlexCtrl'
      }
    }
  })

  .state('alterarSenha', {
    url: '/page12',
    templateUrl: 'templates/alterarSenha.html',
    controller: 'alterarSenhaCtrl'
  })

  .state('criarConta', {
    url: '/page10',
    templateUrl: 'templates/criarConta.html',
    controller: 'criarContaCtrl'
  })

  .state('excluirConta', {
    url: '/page13',
    templateUrl: 'templates/excluirConta.html',
    controller: 'excluirContaCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('sobre', {
    url: '/page18',
    templateUrl: 'templates/sobre.html',
    controller: 'sobreCtrl'
  })

  .state('tabsController.opEs', {
    url: '/page15',
     views: {
      'tab5': {
    templateUrl: 'templates/consumoMedio.html',
    controller: 'opEsCtrl'
      }
     }
  })

  .state('tabsController.relatRioManutenEs', {
    url: '/page21',
    views: {
      'tab4': {
        templateUrl: 'templates/relatRioManutenEs.html',
        controller: 'relatRioManutenEsCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page5')
});