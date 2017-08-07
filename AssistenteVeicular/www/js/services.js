angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])


.factory('Api', function($http){
    var API = 'http://localhost/api-assistente/SlimAssistente/';
    return{
        getMarca: function () {
            return $http({
                url: API + 'marcas' ,
                method:'GET'
            })
        },
         getModelo: function (idMarca) {
             console.info('Heyyyy' + idMarca);
            return $http({
                url: API + 'modelos/' + idMarca ,
                method:'GET'
            })
           },

         getModeloAll: function () {
            return $http({
                url: API + 'modelos' ,
                method:'GET'
            })
           },
         getManutencao: function (manutencoes) {
             var key = window.localStorage.getItem('key')+" ";
            return $http({
                url: API + 'manutencoes' ,
                headers:{'content-type':'application/x-www-form-urlencoded'},
                data: JSON.stringify({data: JSON.stringify(manutencoes),key:key}),
                method:'POST'
            })
         },     
         getUsuario: function () {
            return $http({
                url: API + 'usuario' ,
                method:'GET'
            })
         },
         addProprietario: function (prop) {
            return $http({
                url: API  + 'proprietario',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: prop,
                method:'POST'
            })
         },
          saveProprietario: function () {
            return $http({
                url: API + 'proprietarioSAVE/:id',
                method:'POST'
            })
         
         },
         getProprietario: function () {
            return $http({
                url: API + 'proprietario/:id',
                method:'GET'
            })
         
         },
         fazerLogin: function (login) {
            return $http({
                url: API  + 'login',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: login,
                method:'POST'
            })
         
         },
         
          cadastrarVeiculo: function (veiculo) {
                var key =  window.localStorage.getItem('key')+" ";
                return $http({                 
                url: API  + 'veiculo',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                //data: veiculo,
                data : JSON.stringify({ data: JSON.stringify(veiculo), key : key}), // ToDo: pegar o token quando salvar o proprietario ( CADASTRO )
                method:'POST'   
            })
         
         },
       gravarHodometro: function (hodometro) {
             //console.log("--->"+(window.localStorage.getItem('key')));
             var key =  window.localStorage.getItem('key')+" ";
             return $http({  
                url: API  + 'hodometro',
                headers: { 'content-type': 'application/x-www-form-urlencoded'},
                data : JSON.stringify({ data: JSON.stringify(hodometro), key : key}),
                method:'POST'
            })
         },
    };   
})



.service('BlankService', [function(){

}]);

