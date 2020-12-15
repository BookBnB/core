# language: es
Característica:
  Como usuario
  Quiero ingresar con mi cuenta en la plataforma con proveedores de identidad federada
  Para acceder a las funcionalidades del sistema

  Escenario: Creación exitosa
    Dado que estoy registrado con:
      | name     | John         |
      | surname  | Doe          |
      | email    | john@doe.com |
      | password | password     |
      | role     | host         |
    Cuando inicio sesión correctamente con un proovedor de identidad federada
    Entonces obtengo un token con:
      | email | john@doe.com |
      | role  | host         |

  Escenario: Token invalido
    Dado que estoy registrado con:
      | name     | John         |
      | surname  | Doe          |
      | email    | john@doe.com |
      | password | password     |
      | role     | host         |
    Cuando inicio sesión con un token inválido de proovedor de identidad federada
    Entonces obtengo un error 400 con mensaje "Wrong number of segments in token"

  Escenario: Token sin registro
    Cuando inicio sesión con un token de proovedor de identidad federada cuyo usuario no está registrado
    Entonces obtengo un error 401 con mensaje "Usuario no reconocido"
