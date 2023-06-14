# Unidad 7 - Desafio 5: API

## Instrucciones

- Instalar dependencias:
  `npm i`

- Hacer una copia del archivo `.env.example` y nombrarla `.env`

- Editar el archivo `.env` y llenar los campos segun corresponda (En la mayoria de los casos, solo hay que llenar el campo `DB_PASSWORD` con su password de superuser)

- Correr el proyecto con el comando:
  `npm run start` <br/>
  <b>Esto hará que la base de datos se cree si esta no existe, pero si se encuentra, no se volverá a crear.</b>

- Opcional: Correr el proyecto con el siguiente comando para forzar la creación de la base de datos:</br>
  `npm run start:force`

- Llamar los endpoints <br/>
  `GET /jewels` <br/>
  `GET /jewels/filter` <br/>
  `GET /jewels/:id` <br/>
