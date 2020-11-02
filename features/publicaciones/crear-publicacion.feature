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
    Entonces veo una nueva publicación con:
      | campo               | valor                                                  |
      | titulo              | Departamento con vista                                 |
      | descripcion         | Hermoso departamento con vista al mar en Mar del Plata |
      | precioPorNoche      | 10                                                     |
      | calle               | Av. Bv. Marítimo Patricio Peralta Ramos                |
      | numero              | 4799                                                   |
      | cantidadDeHuespedes | 2                                                      |

  Esquema del escenario: Campos faltantes
    Dado que soy anfitrión
    Cuando creo una publicación sin "<campo>":
    Entonces veo un error indicado en el campo "<campo>"
    Y veo que no hay publicaciones

    Ejemplos:
      | campo               |
      | titulo              |
      | descripcion         |
      | precioPorNoche      |
      | direccion.calle     |
      | direccion.numero    |
      | cantidadDeHuespedes |

  Esquema del escenario: Campos vacíos
    Dado que soy anfitrión
    Cuando creo una publicación con:
      | campo               | valor                 |
      | titulo              | <titulo>              |
      | descripcion         | <descripcion>         |
      | precioPorNoche      | <precioPorNoche>      |
      | calle               | <calle>               |
      | numero              | <numero>              |
      | cantidadDeHuespedes | <cantidadDeHuespedes> |
    Entonces veo un error indicado en el campo "<campoError>"
    Y veo que no hay publicaciones

    Ejemplos:
      | campoError          | titulo                 | descripcion          | precioPorNoche | calle                  | numero | cantidadDeHuespedes |
      | titulo              |                        | Hermoso departamento | 10             | Patricio Peralta Ramos | 4799   | 2                   |
      | descripcion         | Departamento con vista |                      | 10             | Patricio Peralta Ramos | 4799   | 2                   |
      | precioPorNoche      | Departamento con vista | Hermoso departamento |                | Patricio Peralta Ramos | 4799   | 2                   |
      | direccion           | Departamento con vista | Hermoso departamento | 10             |                        | 4799   | 2                   |
      | direccion           | Departamento con vista | Hermoso departamento | 10             | Patricio Peralta Ramos |        | 2                   |
      | cantidadDeHuespedes | Departamento con vista | Hermoso departamento | 10             | Patricio Peralta Ramos | 4799   |                     |
