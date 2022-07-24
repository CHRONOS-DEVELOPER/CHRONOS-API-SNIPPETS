# CHRONOS-API-SNIPPETS

### UMA SIMPLES BIBLIOTECA PARA BACKEND PARA QUEM NÃO QUER PERDER TEMPO PROGRAMANDO E SE DEDICAR PARA O FRONTEND!

## USOS

* CRIAR API`S
* CRIAR WEBSOCKETS
* CRIAR CLIENTE JSON
* CONSUMIR API`S
* CONECTAR COM OS WEBSOCKETS
* SERVIR SITES

# LADO SERVIDOR

### COMO A BIBLIOTECA É FOCADA EM BACKEND, O PRINCIPAL MÓDULO PARA LIDAR COM O MESMO É O _Server_

```javascript
 const { Server } = require("chronos-api-snippets")
``` 
## INICIALIZAR O SERVIDOR
### COM A FUNÇÃO SERVER.INIT(PORTA,FUNÇÃO DE CALLBACK,CORS)

```javascript
const { Server } = require("chronos-api-snippets")
	Server.Init(3000,()=>{
		// callback function
	},{/*cors*/})
``` 

## HOSPEDAR SITE
### UTILIZANDO A FUNÇÃO SERVER.SRCDIR(DIRETÓRIO) NO DIRETÓRIO ONDE ESTA OS ARQUIVOS DO SITE, AS ROTAS SEGUIRAM O ESTILO DE PASTAS DENTRO DO DIRETÓRIO INDICADO.  

### EXEMPLO: /SRC/index.html = / ; /SRC/CADASTRO/index.html = /cadastro

```javascript 
const { Server } = require("chronos-api-snippets")
	Server.SrcDir("./src")
``` 

## ROTAS 

### AS ROTAS SÃO CONFIGURADAS COM A FUNÇÃO SERVER.NEWROUTE, A QUAL QUANDO ATRIBUÍDA A UMA VARIÁVEL RETORNA 4 ATRIBUTOS: GET, POST, PUT E DELETE. ESTES ATRIBUTOS SEMPRE SEGUEM UMA MESMA SINTAXE.

```javascript
const { Server } = require("chronos-api-snippets")
	const Api = Server.NewRoute

	Api.Get("/users",(req,res)=>{
		res.send("hello world")
	})

	Api.Post("/users",(req,res)=>{
		res.send(req.body)
	})

	Api.Put("/users",(req,res)=>{
		res.send(req.body)
		
	})

	Api.Get("/users",(req,res)=>{
		res.send(req.body)
	})

```

## WEBSOCKETS

### OS WEBSOCKETS SÃO TIPOS DE CONEXÃO DUPLA QUE FACILITA EM ALGUM ASPECTOS A CONEXÃO ENTRE O BACK E O FRONT, SUA PRINCIPAL VANTAGEM É A COMUNICAÇÃO EM TEMPO REAL

### PARA INICIAR UM WEBSOCKET, UTILIZA-SE A FUNÇÃO SERVER.SOCKET(), QUE QUANDO ATRIBUÍDA A UMA VARIÁVEL RETORNA DUAS FUNÇÕES:  OnNewConnection E OnDisconnect.

### A FUNÇÃO OnNewConnection INICIALIZA A CONEXÃO E É ONDE TODA A REGRA DE NEGÓCIO VAI ESTAR. A FUNÇÃO ONDISCONNECT É UTILIZADA DENTRO DA OUTRA FUNÇÃO E É CHAMADA QUANDO ALGUM SOCKET É DESCONECTADO


```javascript
const { Server } = require("chronos-api-snippets")
	const Socket = Server.Socket()

	Socket.onNewConnection(socket=>{
		socket.emit("confirm","conection accepted")


		socket.on("func1",data=>{
			console.log(data)

		});

		Socket.onDisconnect(socket=>{
			console.log("socket")
		})
	})
```












