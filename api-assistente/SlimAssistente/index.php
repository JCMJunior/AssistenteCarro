<?php
header('Access-Control-Allow-Origin:*');
//header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
require '../Slim/Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->response()->header('Content-Type', 'application/json;charset=utf-8');

$app->get('/', function () {
  echo "SlimAssistente ";
});

$app->get('/marcas','getMarca');
$app->get('/modelos','getModeloAll');
$app->get('/modelos/:idMarca','getModelo');
//$app->post('/marcaSelecionada','addMarcaSelecinada');
//$app->post('/modeloSelecionado','addModeloSelecinado');
$app->get('/usuario','getUsuario');
$app->post('/proprietario','addProprietario');
$app->get('/proprietario/:id','getProprietario');
$app->post('/proprietarioSAVE/:id','saveProprietario');
$app->delete('/proprietario/:id','deleteProprietario');
$app->post('/manutencoes','getManutencao'); 
$app->post('/login','fazerLogin');
$app->post('/hodometro','atualizarHodometro');
$app->post('/veiculo','cadastrarVeiculo');

$app->run();

function getConn()
{
 return new PDO('mysql:host=localhost;dbname=assistenteveicular',
  'root',
  'root',
  array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
  
  );

}

function getMarca()
{
  $stmt = getConn()->query("select * from tb_marca_veiculo where(cd_marca_veiculo=59 or cd_marca_veiculo=21 or cd_marca_veiculo=22 or cd_marca_veiculo=23);");
  $marcas = $stmt->fetchAll(PDO::FETCH_OBJ);
  echo "{\"marcas\":".json_encode($marcas)."}";
}

function getModelo($idMarca)
{
  $stmt = getConn()->query("call ModeloPorMarca($idMarca);");
  $modelos = $stmt->fetchAll(PDO::FETCH_OBJ);
  echo "{\"modelos\":".json_encode($modelos)."}";
}

function getModeloAll()
{
  $stmt = getConn()->query("select * from tb_modelo ");
  $modelos = $stmt->fetchAll(PDO::FETCH_OBJ);
  echo "{\"modelos\":".json_encode($modelos)."}";
}

function getUsuario()
{
  $stmt = getConn()->query("SELECT * FROM tb_proprietario WHERE cd_proprietario");
  $usuario = $stmt->fetchAll(PDO::FETCH_OBJ);
  echo "{\"usuario\":".json_encode($usuario)."}";
}

function getManutencao()
{$request = \Slim\Slim::getInstance()->request();
  $data = json_decode($request->getBody(),true);
  $token = $data['key'];
  $conn = getConn();
  if( isAutorizado($token) ){
  $sql ="call ConsultarManutencoes('$token');";
  $stmt = $conn->prepare($sql);
  $stmt->execute();
  $manutencoes = $stmt->fetchAll(PDO::FETCH_OBJ);
  echo "{\"manutencoes\":".json_encode($manutencoes)."}";
  }
  else{
	echo json_encode( array('mensagem'=>'Não foi possível consultar as manutenções'));
  }
}

/*
function addMarcaSelecinada()
{
  $request = \Slim\Slim::getInstance()->request();
  $marcaSelecionada = json_decode($request->getBody());
  $sql= ;
  
}


function addModeloSelecinado()
{
  $request = \Slim\Slim::getInstance()->request();
  $modeloSelecionado = json_decode($request->getBody());

  
}
*/
function addProprietario()
{
  $request = \Slim\Slim::getInstance()->request();
  $proprietario = json_decode($request->getBody());
  
  $sql = "call CadastroProprietario(:nome,:rg,:cpf,:nascimento,:email);";
  $conn = getConn();
  $stmt = $conn->prepare($sql);
  //$stmt->bindParam("id",$proprietario->id);
  $stmt->bindParam("nome",$proprietario->nomeUsuario);
  $stmt->bindParam("rg",$proprietario->rgUsuario);
  $stmt->bindParam("cpf",$proprietario->cpfUsuario);
  $stmt->bindParam("nascimento",$proprietario->dtNascUsuario);
  $stmt->bindParam("email",$proprietario->emailUsuario);
  $stmt->execute();
  $proprietario->id = $conn->lastInsertId();
  
  $sqlLogin = "call CadastroLogin(:usuario,:senha);";
  $conn = getConn();
  $stmt = $conn->prepare($sql);
  $key = md5($proprietario->emailUsuario);
  $stmt = $conn->prepare($sqlLogin);
  $stmt->bindParam("usuario", $proprietario->emailUsuario);
  $stmt->bindParam("senha",$proprietario->senhaUsuario);
  $stmt->execute();
 
  
  $sqlToken = "call CadastroToken(:key,:login);";
  $conn = getConn();
  $stmt = $conn->prepare($sql);
  $key = md5($proprietario->emailUsuario); //md5 do email
  $stmt = $conn->prepare($sqlToken);
  $stmt->bindParam("key", $key);
  $stmt->bindParam("login",$proprietario->emailUsuario);
  $stmt->execute();

  
  echo json_encode(array('key'=>$key ));
}

function getProprietario($id)
{
  $conn = getConn();
  $sql = "SELECT * FROM tb_proprietario WHERE cd_proprietario = cd_proprietario";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam("cd_proprietario",$id);
  $stmt->execute();
  $proprietario = $stmt->fetchObject();
  echo json_encode($proprietario);
}


function saveProprietario($id)
{
  $request = \Slim\Slim::getInstance()->request();
  $proprietario = json_decode($request->getBody());
  $sql = "UPDATE proprietario SET nome=:nome,rg=:rg,cpf=:cpf,nascimento=:nascimento WHERE id=:id";
  $conn = getConn();
  $stmt = $conn->prepare($sql);
  $stmt->bindParam("nome",$proprietario->nomeUsuario);
  $stmt->bindParam("rg",$proprietario->rgUsuario);
  $stmt->bindParam("cpf",$proprietario->cpfUsuario);
  $stmt->bindParam("nascimento",$proprietario->dtNascUsuario);
  $stmt->bindParam("id",$id);
  $stmt->execute();
  echo json_encode($proprietario);

}

function deleteProprietario($id)
{
  $sql = "DELETE FROM tb_proprietario WHERE id=:id";
  $conn = getConn();
  $stmt = $conn->prepare($sql);
  $stmt->bindParam("id",$id);
  $stmt->execute();
  echo "{'message':'Proprietario apagado'}";
}


function fazerLogin(){
  $key = array('key'=>'');
  $request = \Slim\Slim::getInstance()->request();
  $login = json_decode($request->getBody());
  
  $sql = "SELECT * FROM tb_login WHERE nm_usuario =:nome and nm_senha =:senha";
  $conn = getConn();
  $stmt = $conn->prepare($sql);
  
  $stmt->bindParam("nome",$login->email);
  $stmt->bindParam("senha",$login->senha);
  
  $stmt->execute();
  $usuario = $stmt->fetchObject();
  
  if( $usuario != null ){
	$key['key'] = md5($login->email);
  }
  
  
  echo json_encode( $key );
}

function cadastrarVeiculo(){
  $request = \Slim\Slim::getInstance()->request();
  $data = json_decode($request->getBody(),true);
  $token = $data['key'];
  $veiculo = json_decode($data['data']);
  $conn = getConn();
 // anoVeiculo: "2003", placaVeiculo: "abc1234", hodometrokilometragem: "100000"}
  if( isAutorizado($token) ){
	// gravar hodometro associado ao id  
	$usuario = getUsuarioPeloToken($token);
	// print_r($usuario);exit();
	// insert to hodometro
  $sql = "call CadastroVeiculo(:placa, :ano, :km, :email, :modelo);";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam("placa",$veiculo->placaVeiculo);
  $stmt->bindParam("ano",$veiculo->anoVeiculo);
  $stmt->bindParam("km",$veiculo->hodometrokilometragem); //quilometragem do hodometro
  //echo json_encode($usuario );
  // die();
  $stmt->bindParam("email",$usuario->nm_usuario);
  // $stmt->bindParam("marca",$veiculo->marcaSelecionada); // marca selecionado
  $stmt->bindParam("modelo",$veiculo->modeloSelecionado); // modelo selecionado
  $stmt->execute();
	echo json_encode( array('mensagem'=>'Veículo cadastrado com sucesso' . mysql_error()));
  }  
  else{
	echo json_encode( array('mensagem'=>'Não foi possível cadastrar o Veículo'));
  }
}

function atualizarHodometro(){
  $request = \Slim\Slim::getInstance()->request();
  $data = json_decode($request->getBody(), true);
  $token = $data['key'];
  $hodometro = json_decode($data['data']);
  $conn = getConn();
  if( isAutorizado($token) ){
	$usuario = getUsuarioPeloToken($token);// gravar hodometro associado ao id  
	$sql = "call AtualizarHodometro(:km, :email);";// insert to hodometro
  $stmt = $conn->prepare($sql);
  $stmt->bindParam("km",$hodometro->kilometragem); // quilometragem do veiculo
  $stmt->bindParam("email",$usuario->nm_usuario);
  $stmt->execute();
	echo json_encode( array('mensagem'=>'hodometro atualizado com sucesso'));
  }  
  else{
  echo json_encode( array('mensagem'=>'nao foi possível atualizar o hodometro'));
  }
}

function isAutorizado($key){
  $sql = "SELECT * FROM tb_token WHERE nm_token =:key";
  $conn = getConn();
  $stmt = $conn->prepare($sql);
  $stmt->bindParam("key", $key );
  $stmt->execute();
  $token = $stmt->fetchObject();
  return ( $token != null );
}

function getUsuarioPeloToken($key){
  $sql = "call ConsultarUsuarioPeloToken(:key);";
  //$sql = "select * from tb_token  tk  inner join tb_proprietario tp on tp.cd_proprietario = tk.fk_tb_login where nm_token =:key";
  $conn = getConn();
  $stmt = $conn->prepare($sql);
  $stmt->bindParam("key", $key );
  $stmt->execute();
  $usuario = $stmt->fetchObject();
  return $usuario;
}