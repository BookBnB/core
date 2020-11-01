# language: es
Característica:
  Como usuario
  Quiero poder acceder usando mi usuario y contraseña
  Para poder hacer uso de las funcionalidades de la plataforma

  Escenario: Creación exitosa
    Dado que soy un usuario con datos:
      | nombre              | Test                                                   |
      | email               | test@test.test                                         |
      | password            | password                                               |
      | role                | guest                                                  |
    Cuando inicio sesión
    Entonces obtengo un token con:
      | email               | test@test.test                                         |
      | rol                 | host                                                   |
