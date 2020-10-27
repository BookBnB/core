# language: es
Característica:
  Como anfitrion
  Quiero poder dar de alta una publicacion de mi alojamiento
  Para que realicen reservas del mismo y poder cobrar su uso

  Escenario: Creación exitosa
    Dado que soy anfitrión
    Cuando creo una publicación con:
      | campo               | valor                                                  |
      | titulo              | Departamento con vista                                 |
      | descripcion         | Hermoso departamento con vista al mar en Mar del Plata |
      | precioPorNoche      | 10                                                     |
      | calle               | Av. Bv. Marítimo Patricio Peralta Ramos                |
      | numero              | 4799                                                   |
      | cantidadDeHuespedes | 2                                                      |
    Entonces veo una publicación con:
      | campo               | valor                                                  |
      | titulo              | Departamento con vista                                 |
      | descripcion         | Hermoso departamento con vista al mar en Mar del Plata |
      | precioPorNoche      | 10                                                     |
      | calle               | Av. Bv. Marítimo Patricio Peralta Ramos                |
      | numero              | 4799                                                   |
      | cantidadDeHuespedes | 2                                                      |

