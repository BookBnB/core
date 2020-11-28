# language: es
Característica:
  Como usuario
  Quiero poder acceder usando mi usuario y contraseña
  Para poder hacer uso de las funcionalidades de la plataforma

  Antecedentes:
    Dado que soy un usuario con datos:
      | nombre              | John Doe                                               |
      | email               | john@doe.com                                           |
      | password            | password                                               |
      | role                | host                                                   |

  Escenario: Sesión inválida
    Dado que inicié mi sesión correctamente
    Y que mi sesión es inválida
    Cuando listo las publicaciones
    Entonces obtengo un error 401 con mensaje 'Sesión inválida'
