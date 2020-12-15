# language: es
Característica:
  Como usuario
  Quiero poder acceder usando mi usuario y contraseña
  Para poder hacer uso de las funcionalidades de la plataforma

  Antecedentes:
    Dado que estoy registrado con:
      | name     | John         |
      | surname  | Doe          |
      | password | password     |
      | email    | john@doe.com |
      | role     | host         |

  @only
  Escenario: Sesión inválida
    Dado que inicié mi sesión correctamente
    Y que mi cambio mi token por uno inválido
    Cuando listo las publicaciones
    Entonces obtengo un error 401 con mensaje 'Sesión inválida'
