# language: es
Característica:
  Como usuario
  Quiero poder acceder usando mi usuario y contraseña
  Para poder hacer uso de las funcionalidades de la plataforma

  Escenario: Usuario intenta listar publicaciones sin haber creado una sesion
    Dado que soy un usuario con datos:
      | name     | John         |
      | surname  | Doe          |
      | email    | john@doe.com |
      | password | password     |
      | role     | host         |
    Cuando listo las publicaciones
    Entonces obtengo un error 401 con mensaje 'Sesión no existente'
