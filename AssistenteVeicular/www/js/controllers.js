angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {
	
	$scope.textoManutencao = ' A manutenção periódica do carro é um requisito para que tudo permaneça em ordem e com segurança.Ela é realmente necessária para evitar problemas mais graves e custosos. Além disso, tomando alguns cuidados é possível prolongar a vida útil de muitas peças do automóvel.';
	
	$scope.textoOleo ='Verifique o nível semanalmente. Esse procedimento pode ser feito em casa. Antes de usar o carro pela primeira vez no dia e em um piso nivelado, retire a vareta do óleo. É necessário limpá-la para poder medir corretamente o nível do óleo. Faça isso usando um papel ou pano. Logo após, insira-a novamente e fique atento ao retirá-la: a marca do óleo deve estar entre as marcas “Mín” e “Máx” da vareta.';
	
	$scope.aguaRadiador= 'Essa manutenção também pode ser feita por você mesmo e semanalmente. Com o motor frio e o veículo nivelado, a água deve estar entre o “Mín” e o “Máx” indicados no reservatório. A principal função do radiador é manter o motor resfriado. Por isso, ao verificar que a água precisa ser completada frequentemente, leve o carro a um profissional para evitar queimar juntas, velas de ignição, furar pistões ou fundir o motor.';
	
	$scope.filtroDeAr='Filtro de ar: não há tempo determinado concreto para sua troca, porém recomenda-se que seja feita a cada 7.000Km. Um filtro sujo pode causar danos ao desempenho do carro, aumentando o consumo de combustível.';
})
   
.controller('cadastrarVeCuloCtrl', function($scope, Api, $http,$ionicPopup, $state) {

	$scope.veiculo = {};
	$scope.cadastrar = function()
	{
		console.log($scope);

			$scope.veiculo.marcaSelecionada = $scope.listaMarca.idMarcaSelecionada;
			$scope.veiculo.modeloSelecionado = $scope.listaModelo.idModeloSelecionado;
 

		console.log($scope.veiculo);


			  if( $scope.veiculo.anoVeiculo != null && $scope.veiculo.hodometrokilometragem != null && $scope.veiculo.placaVeiculo !=null){
			Api.cadastrarVeiculo($scope.veiculo).then(function(result){
				
				console.info(result);
                console.info('---------------APOS ----------------');
                console.info(result.data);
  				
			$scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     template: ' Veículo cadastrado com sucesso!'
   });
   alertPopup.then(function(res) {
	 $state.go ('tabsController.home_tab1');
   });
 };
			$scope.showAlert();	  
			});
			}else{
				  $ionicPopup.alert({
             template: 'Preencha todos os campos!'
			 });
		};
}


	Api.getMarca().then(function(result) 
	{
	//console.log(result.data.categorias); 
		$scope.listaMarca = {
			marcasDisponiveis: result.data.marcas
	}
})
	
	$scope.buscarModelo = function(){
		
		console.info($scope.listaMarca.idMarcaSelecionada);
		
		Api.getModelo($scope.listaMarca.idMarcaSelecionada).then(function(result)
		{	
			$scope.listaModelo = { 
				modeloSelecionado: null,
				modelosDisponiveis: result.data.modelos
			};
		})

	}
})
//-/*///////////////////
.controller('manutencaosCtrl', function($scope,Api,$ionicPopup) {
	
	$scope.hodometro={};
	
//	$scope.listaManutencao = null;
	//alert(' It s alive ');
	$scope.manutencoes={};	
console.log('estouuuuuuuuuuuuuuu_____aki');

	console.info(window.localStorage.getItem('key'));

	Api.getManutencao($scope.manutencoes).then(function(result)
		{	
				$scope.listaManutencao = {
				tipoManutencao: result.data.manutencoes
		}			
		console.log(result);	
			
			
// window.localStorage.setItem('key',result.data);
//			console.info($scope.tipoManutencao);
//					console.warn(arguments);
	})
})
///////////////////*/
.controller('minhaContaCtrl', function($scope,Api,$ionicPopup) {
	
console.info(window.localStorage.getItem('key'));

Api.getProprietario().then(function(result)
	{			
		$scope.proprietario ={ 
			nome: result.data.nm_proprietario,
			email: result.data.nm_email_proprietario,
			nascimento: result.data.dt_nascimento_proprietario,
			rg: result.data.cd_rg_proprietario,
			cpf: result.data.cd_cpf_proprietario
		};
		console.log(result.data); 
	})
})
   
.controller('alterarDadosCtrl',['$scope','Api','$state', function($scope, Api, $state, $http,$ionicPopup) {
	
	Api.getProprietario().then(function(result)
	{	
		$scope.proprietario ={ 
			nome: result.data.nm_proprietario,
			email: result.data.nm_email_proprietario,
			nascimento: result.data.dt_nascimento_proprietario,
			rg: result.data.cd_rg_proprietario,
			cpf: result.data.cd_cpf_proprietario
		};
		console.log(result.data); 
	})
		$scope.proprietario = {
			nomeUsuario:'' ,
			emailUsuario:'',
			dtNascUsuario:'',
			rgUsuario:'', 
			cpfUsuario:''};
			
		console.log($scope.proprietario);
		$scope.salvarDados = function () {
		console.log($scope.proprietario);
			Api.saveProprietario($scope.proprietario).then(function(result){
		        console.info(result.data);
  			   // $state.go ('cadastrarVeCulo');
		});
	};
}] )
   
.controller('meuVeCuloCtrl', function($scope,$ionicPopup) {

})
   
.controller('hodMetroCtrl', function($scope,Api,$ionicPopup,$state) {
		$scope.hodometro={};
		$scope.gravarHodometro = function(){
		var km = document.getElementById("km").value;
		console.log($scope.hodometro);
		
		Api.gravarHodometro($scope.hodometro).success(function(result){
			if (km <= 0 || km == ''){
				  $ionicPopup.alert({
            	 template: 'Atualize o hodometro!!!'});
			 }		 
			 else if (km >= 8500 && km <= 10000 || km >= 18500 && km <= 20000 || km >= 28500 && km <= 30000 ||
			 km >= 58500 && km <= 60000 || km >= 98500 && km <= 100000 || km >= 148500 && km <= 150000 ){
			
				 $ionicPopup.alert({
            	 template: 'Manutenção prestes a vencer. Verifique suas manutenções!!!'});
 					 $state.go ('tabsController.home_tab1');
			 }else{
				  $ionicPopup.alert({
            	 template: 'Bem vindo!!!'});
				  $state.go ('tabsController.home_tab1');
			 }
		})
		.error(function(result) {
				
		});
	};
})			
		/*.then(function(result){
				console.log(result);
		});

.controller('manutenEsCtrl', function($scope,Api,$ionicPopup) {
	alert(' It s alive ');
	$scope.manutencoes={};
console.log('fffffffffffuuuuuuuuuuuuuuuuuuuuu');
	console.info(window.localStorage.getItem('key'));
	Api.getManutencao('uala').then(function(result)
		{	
			$scope.listaManutencao = {
				tipoManutencao: result.data.manutencoes
			}
		 window.localStorage.setItem('key',result.key);
			console.info($scope.listaManutencao);
	})
})
*/   
.controller('calculadoraFlexCtrl', function($scope) {

	$scope.calcular = function() {
		//console.log("Funcao");
	   var g = document.getElementById("g").value;
	   var e = document.getElementById("e").value;

		  if(e == "" || g == ""){
	      $scope.melhor = "Preencha os campos";
	  }
	   else if(e <= g*0.7){
	      $scope.melhor = "Abasteça com etanol";
	   }
	   else{
	      $scope.melhor = "Abasteça com gasolina";
	   }
	}
})
   
.controller('alterarSenhaCtrl', function($scope,$ionicPopup) {

})
   
.controller('criarContaCtrl',['$scope','Api','$state', function($scope, Api, $state, $http,$ionicPopup) {
	// $state.go ('cadastrarVeCulo');
		$scope.proprietario = {};
		$scope.addProprietario = function () {
			var cpf = document.getElementById("cpf").value;
			
		console.log($scope.proprietario);
			
			if( $scope.proprietario.cpfUsuario != null && $scope.proprietario.emailUsuario != null ){

			Api.addProprietario($scope.proprietario).then(function(result){
				//alert("chamada com sucesso!");
				console.info(">>",result);
				window.localStorage.setItem('key',result.data.key); 
                console.info('-------------------------------');
                console.info(result.data);
  				// console.log(addProprietario);
					alert('Cadastrado com sucesso!')
			    $state.go ('cadastrarVeCulo');
			});
			}else{
				alert('Preencha todos os campos!')
			//	 $ionicPopup.alert({
            //	 template: 'Preencha todos os campos!'
			// });
		};
	}
}])
   
.controller('excluirContaCtrl', function($scope) {

})
         
.controller('loginCtrl', function($scope,$ionicSideMenuDelegate,Api,$state,$window,$ionicPopup) {
   
   $scope.login = {};
	//Disable sidemenu before login
   $scope.$on('$ionicView.enter', function () {
       $ionicSideMenuDelegate.canDragContent(false);
    });
	
   $scope.fazerLogin = function () {
	   
	   if( $scope.login.email != null && $scope.login.senha.length > 0 ){
			Api.fazerLogin( $scope.login ).then(function(result){
				console.log(result.data);
				if(result.data.key.length == 32)
				{
					window.localStorage.setItem('key',result.data.key); 
					$state.go('hodMetro');
					
				}else{
					//alert("Verifique dados de sua conta ,email ou senha incorretos!!!");
					  $ionicPopup.alert({
            	        template: 'Verifique seus dados, de sua conta ,email ou senha incorretos!!!'
			         });
				}
				
	   		});   
	   }else{
		   //alert("Email e senha incorretos, verifique os campos!!!");
		   $ionicPopup.alert({
            	        template: 'Email e senha incorretos, verifique os campos!'
			         });
	   }
   }
})
   
.controller('sobreCtrl', function($scope) {

})

.controller('opEsCtrl', function($scope) {

})

.controller('consumoMedidoCtrl', function($scope,$ionicPopup) {
		$scope.calcular = function() {
		console.log("funfo");
		//var precoLitro = document.getElementById("precoLitro").value;
		//var vlAbastecido = document.getElementById("vlAbastecido").value;
		var totalLitros = document.getElementById("totalLitros").value;
		var hodmetro = document.getElementById("hodometro").value;
		//var precoLitro = document.getElementById("precoLitro").value;
		
		if(totalLitros == "" || hodometro == "")
		{
			
			$scope.melhor = "Preencha os campos"
		}
		else 
		{
			$scope.melhor = (totalLitros/hodometro);
		}
		
		
	};

}) 

.controller('relatRioManutenEsCtrl', function($scope,Api,$ionicPopup) {
	$scope.hodometro={};

	$scope.manutencoes={};	
console.log('estouuuuuuuuuuuuuuu_____aki');

	console.info(window.localStorage.getItem('key'));

	Api.getManutencao($scope.manutencoes).then(function(result)
		{	
				$scope.listaManutencao = {
				tipoManutencao: result.data.manutencoes
			}
			
		console.log($scope.listaManutencao.tipoManutencao);	
			
	})
})

 