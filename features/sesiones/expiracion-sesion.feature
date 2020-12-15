# language: es
Característica:
  Como usuario
  Quiero poder acceder usando mi usuario y contraseña
  Para poder hacer uso de las funcionalidades de la plataforma

  Antecedentes:
    Dado que soy un usuario con datos:
      | name     | John         |
      | surname  | Doe          |
      | email    | john@doe.com |
      | password | password     |
      | role     | host         |

  Escenario: Expiración de sesión
    Dado que inicié mi sesión correctamente
    Y que mi sesión expiró
    Cuando listo las publicaciones
    Entonces obtengo un error 401 con mensaje 'Sesión expirada'
