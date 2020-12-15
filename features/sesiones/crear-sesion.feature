# language: es
Característica:
  Como usuario
  Quiero poder acceder usando mi usuario y contraseña
  Para poder hacer uso de las funcionalidades de la plataforma

  Escenario: Creación exitosa
    Dado que soy un usuario con datos:
      | name     | John         |
      | surname  | Doe          |
      | email    | john@doe.com |
      | password | password     |
      | role     | host         |
    Cuando inicio sesión con email 'john@doe.com' y contraseña 'password'
    Entonces obtengo un token con:
      | email | john@doe.com |
      | role  | host         |

  Escenario: Creación fallida - Contraseña incorrecta
    Dado que soy un usuario con datos:
      | name     | John         |
      | surname  | Doe          |
      | email    | john@doe.com |
      | password | password     |
      | role     | host         |
    Cuando inicio sesión con email 'john@doe.com' y contraseña 'incorrecta'
    Entonces obtengo un error 401 con mensaje 'Usuario no reconocido'

  Escenario: Creación fallida - Usuario inexistente
    Dado que soy un usuario con datos:
      | name     | John         |
      | surname  | Doe          |
      | email    | john@doe.com |
      | password | password     |
      | role     | host         |
    Cuando inicio sesión con email 'noexisto@doe.com' y contraseña 'password'
    Entonces obtengo un error 401 con mensaje 'Usuario no reconocido'
