Pré Requisitos: Possuir NodeJs e MySQL intalados
SGBD utilizado: MySql com MariaDB

git clone https://github.com/AlvaroCG123/MiniRegional.git

npm i

npx prisma migrate dev

npx prisma generate

npx prisma db seed

npm run dev

Login

http://localhost:3000/usuario/login -POST


//Administrador
{
  "email": "admin@wedding.com", 
  "senha": "admin123@"
}

ou
//Cerimonialista

{
  "email": "admin@wedding.com", 
  "senha": "admin123@"
}

//ADMIN
http://localhost:3000/convidado/dashboard -GET

//ADMIN E CERIMONIALISTA
http://localhost:3000/convidado/listar -GET

//ADMIN E CERIMONIALISTA
http://localhost:3000/convidado/pesquisa?nome_completo=NOME_AQUI -GET

//ADMIN
http://localhost:3000/convidado/criar -POST

{
  "nome_completo":"Teste da Silva",
  "email":"testinho@gmail.com",
  "telefone":"1231232",
  "mesaId":1,
  "CPF":"12312313"
}

//ADMIN
http://localhost:3000/convidado/atualizar/ID_CONVIDADO -PUT

{
  "nome_completo":"Teste da Silva",
  "email":"testiasnho@gmail.com",
  "telefone":"12311232",
  "mesaId":1,
  "CPF":"12312313"
}

//ADMIN E CERIMONIALISTA
http://localhost:3000/convidado/checkin/ID_CONVIDADO -PATCH

//ADMIN
http://localhost:3000/convidado/defazercheckin/ID_CONVIDADO -PATCH

//ADMIN
http://localhost:3000/convidado/deletar/ID_CONVIDADO -DELETE