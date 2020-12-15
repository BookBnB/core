# language: es
Característica:
  Como usuario
  Quiero ingresar con mi cuenta en la plataforma con proveedores de identidad federada
  Para acceder a las funcionalidades del sistema

  @wip
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
