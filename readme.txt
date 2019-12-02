Para a execução desse sistema, siga o seguinte passo a passo:

Para iniciar o setup é necessário alterar os dados da DB no arquivo local.js que está na pasta config, 
trocando o user, a senha, a db, a porta e a host para os dados da db criada.

Execute o sails
    > sails lift

Depois execute o script SQL no PostgreSQL:
    > psql -d <dbname> -l db.sql
sendo db.sql o arquivo presente nesse repositório.
Outra maneira é abrir o arquivo e executar os comandos um por um no console do postgres.

PS: https://www.postgresql.org/docs/current/app-pgdump.html essa página pode ajudar a executar
o script sql no postgres.

Após esse setup, o usuário padrão do sistema será:
    user: root
    pass: toor

E ele possuirá 4 listas já criadas, com alguns itens e algumas tags.

Poderão ser criados novos usuários e novas notas, assim como poderão ser deletadas notas, etc.
São possíveis de serem realizadas pesquisas, filtragens por tag e ordenação por data de alteração,
por nome e por tipo.

Em caso de erro ao executar sails lift, tentar executar sails lift --drop, pois assim ele irá resetar a DB.
Esse erro provavelmente ocorre porque a db já contém constraints e o waterline não as reconhece.
Se as constraints de fk não fossem adicionadas, o sails rodaria normalmente com a db populada.