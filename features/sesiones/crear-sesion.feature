# language: es
Característica:
  Como usuario
  Quiero poder acceder usando mi usuario y contraseña
  Para poder hacer uso de las funcionalidades de la plataforma

  Escenario: Creación exitosa
    Dado que estoy registrado con:
      | name     | John         |
      | surname  | Doe          |
      | email    | john@doe.com |
      | password | password     |
      | role     | host         |
    Cuando inicio sesión con email 'john@doe.com' y contraseña 'password'
    Entonces obtengo un token con:
      | email | john@doe.com |
      | role  | host         |

  @only
  Escenario: Creación fallida - Contraseña incorrecta
    Dado que estoy registrado con:
      | name     | John         |
      | surname  | Doe          |
      | email    | john@doe.com |
      | password | password     |
      | role     | host         |
    Cuando inicio sesión con email 'john@doe.com' y contraseña 'incorrecta'
    Entonces obtengo un error 401 con mensaje 'User not recognized'

  Escenario: Creación fallida - Usuario inexistente
    Dado que estoy registrado con:
      | name     | John         |
      | surname  | Doe          |
      | email    | john@doe.com |
      | password | password     |
      | role     | host         |
    Cuando inicio sesión con email 'noexisto@doe.com' y contraseña 'password'
    Entonces obtengo un error 401 con mensaje 'User not recognized'

  Escenario: Creación fallida - Email faltante
    Cuando inicio sesión sin email
    Entonces obtengo un error 400 con mensaje 'User or password missing'

  Escenario: Creación fallida - Contraseña faltante
    Cuando inicio sesión sin contraseña
    Entonces obtengo un error 400 con mensaje 'User or password missing'
