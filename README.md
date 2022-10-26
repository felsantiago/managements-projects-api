### Primeiros passos

1. Ter o docker instalado
2. Instalar postgresql no docker 
```shell
docker run --name postgresql -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
3. Executar as migrations
```shell
yarn typeorm migration:run
```
4. Fazer o install das denpdências `yarn`
5. Rodar a api `yarn dev:server`

### Collection Insomnia
Nesse arquivo existe todos os endpoints. Arquivo: collections_insomnia_2022-10-26.json
