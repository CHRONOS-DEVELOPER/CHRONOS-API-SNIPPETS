# CHRONOS-API-SNIPPETS

### UMA SIMPLES BIBLIOTECA PARA BACKEND PARA QUEM NÃO QUER PERDER TEMPO PROGRAMANDO E SE DEDICAR PARA O FRONTEND!

## USOS

* CRIAR API`S
* CRIAR WEBSOCKETS
* CRIAR CLIENTE JSON
* CONSUMUIR API`S
* CONECTAR COM OS WEBSOCKETS
* SERVIR SITES

# LADO SERVIDOR

### COMO A BIBLIOTECA É FOCADA EM BACKEND, O PRINCIPAL MÓDULO PARA LIDAR COM O MESMO É O _SERVER_

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
### ULTILIZANDO A FUNÇÃO SERVER.SRCDIR(DIRETÓRIO) NO DIRETÓRIO ONDE ESTA OS ARQUIVOS DO SITE

```javascript 
const { Server } = require("chronos-api-snippets")
	Server.SrcDir("./src")
``` 











