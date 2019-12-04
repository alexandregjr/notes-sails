# notes-sails

Sistema de criação de anotações. [Link do projeto.](https://github.com/alexandregjr/notes-sails)

### Como executar

Para a execução desse sistema, siga o seguinte passo a passo:
1. Alterar o arquivo config/local.js
    * Para iniciar o setup é necessário alterar os dados da DB no arquivo local.js que está na pasta config, trocando o user, a senha, a db, a porta e a host para os dados da db criada.
2. Execute o sails

```shell
> sails lift
```

3. Executar o script sql
```shell
 > psql -d <dbname> -l db.sql
```
* O arquivo db.sql é o que está  presente nesse repositório. Outra maneira é abrir o arquivo e executar os comandos um por um no console do postgres.
    * [Essa página](https://www.postgresql.org/docs/current/app-pgdump.html)  pode ajudar a executar o script sql no postgres.

### Informações Padrão
Após o setup inicial, as informações padrão do sistema serão:
```
    user: root
    pass: toor
```
E ele possuirá 4 listas já criadas, com alguns itens e algumas tags.

### Features
Poderão ser criados novos usuários e novas notas, assim como poderão ser deletadas notas, etc.

São possíveis de serem realizadas pesquisas, filtragens por tag e ordenação por data de alteração, por nome e por tipo.

### Erros
Em caso de erro ao executar *sails lift*, tentar executar 
```shell
> sails lift --drop
```
para o que a DB seja resetada.
Esse erro provavelmente ocorre porque a db já contém constraints e o waterline não as reconhece. Se as constraints de fk não fossem adicionadas, o sails rodaria normalmente com a db populada.

### Colaboradores
Alexandre Galocha Pinto Júnior (10734706) [git](https://github.com/alexandregjr)
Eduardo Pirro (10734665) [git](https://github.com/EdPirro)


<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->

<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

