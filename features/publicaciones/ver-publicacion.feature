# language: es
Característica:
  Como huesped
  Quiero poder visualizar una publicacion de un alojamiento
  Para ver sus fotos y/o videos y revisar sus características.

  Escenario: Ver una publicacion
    Dado que soy "huesped"
    Y que existe una publicacion con:
      | campo               | valor                                                  |
      | titulo              | Departamento con vista                                 |
      | descripcion         | Hermoso departamento con vista al mar en Mar del Plata |
      | precioPorNoche      | 10                                                     |
      | direccion.calle     | Av. Bv. Marítimo Patricio Peralta Ramos                |
      | direccion.numero    | 4799                                                   |
      | cantidadDeHuespedes | 2                                                      |
    Cuando ingreso a la publicación con título "Departamento con vista"
    Entonces veo una publicación con:
      | titulo              | Departamento con vista                                 |
      | descripcion         | Hermoso departamento con vista al mar en Mar del Plata |
      | precioPorNoche      | 10                                                     |
      | direccion.calle     | Av. Bv. Marítimo Patricio Peralta Ramos                |
      | direccion.numero    | 4799                                                   |
      | cantidadDeHuespedes | 2                                                      |
