# language: es
Característica:
  Como usuario
  Quiero poder acceder usando mi usuario y contraseña
  Para poder hacer uso de las funcionalidades de la plataforma

  Escenario: Expiración de sesión
    Dado que soy un usuario con datos:
      | nombre              | John Doe                                               |
      | email               | john@doe.com                                           |
      | password            | password                                               |
      | role                | host                                                   |
    E inicié mi sesión correctamente
    Y que existe una publicacion con:
      | campo               | valor                                                  |
      | titulo              | Departamento con vista                                 |
      | descripcion         | Hermoso departamento con vista al mar en Mar del Plata |
      | precioPorNoche      | 10                                                     |
      | calle               | Av. Bv. Marítimo Patricio Peralta Ramos                |
      | numero              | 4799                                                   |
      | cantidadDeHuespedes | 2                                                      |
    Y mi sesión expiró
    Cuando ingreso a la publicación con título "Departamento con vista"
    Entonces obtengo un error 401 con mensaje 'Sesión expirada'
