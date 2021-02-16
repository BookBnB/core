# language: es
Característica:
  Como anfitrion
  Quiero poder dar de alta una publicacion de mi alojamiento
  Para que realicen reservas del mismo y poder cobrar su uso

  Antecedentes:
    Dado que soy "anfitrión"

  Escenario: Creación exitosa
    Cuando creo una publicación con:
      | titulo                         | Departamento con vista                                 |
      | descripcion                    | Hermoso departamento con vista al mar en Mar del Plata |
      | precioPorNoche                 | 10                                                     |
      | direccion.pais                 | Argentina                                              |
      | direccion.provincia            | Buenos Aires                                           |
      | direccion.ciudad               | Mar del Plata                                          |
      | direccion.municipio            | Mar del Plata                                          |
      | direccion.direccion            | Avenida Patricio Peralta Ramos 4799                    |
      | direccion.coordenadas.latitud  | -38.0083                                               |
      | direccion.coordenadas.longitud | -57.5385                                               |
      | cantidadDeHuespedes            | 2                                                      |
      | tipoDeAlojamiento              | Alojamiento entero                                     |
      | imagenes[0].url                | google.com                                             |
    Entonces veo una nueva "publicación" con:
      | titulo                         | Departamento con vista                                 |
      | descripcion                    | Hermoso departamento con vista al mar en Mar del Plata |
      | precioPorNoche                 | 10                                                     |
      | direccion.pais                 | Argentina                                              |
      | direccion.provincia            | Buenos Aires                                           |
      | direccion.ciudad               | Mar del Plata                                          |
      | direccion.municipio            | Mar del Plata                                          |
      | direccion.direccion            | Avenida Patricio Peralta Ramos 4799                    |
      | direccion.coordenadas.latitud  | -38.0083                                               |
      | direccion.coordenadas.longitud | -57.5385                                               |
      | cantidadDeHuespedes            | 2                                                      |
      | tipoDeAlojamiento              | Alojamiento entero                                     |
      | imagenes[0].url                | google.com                                             |
      | estado                         | Pendiente de creación                                  |
    Y veo que está publicada a mí nombre

  Escenario: Municipio opcional
    Cuando creo una publicación sin "direccion.municipio"
    Entonces veo una nueva publicación con "direccion.municipio" nulo

  Escenario: Imagenes opcionales
    Cuando creo una publicación sin "imagenes"
    Entonces veo una nueva "publicación" con:
      | imagenes |  |

  Esquema del escenario: Campos faltantes
    Cuando creo una publicación sin "<campo>"
    Entonces veo un error indicado en el campo "<campoError>"
    Y veo que no hay publicaciones

    Ejemplos:
      | campo                          | campoError          |
      | titulo                         | titulo              |
      | descripcion                    | descripcion         |
      | precioPorNoche                 | precioPorNoche      |
      | direccion.pais                 | direccion           |
      | direccion.provincia            | direccion           |
      | direccion.ciudad               | direccion           |
      | direccion.direccion            | direccion           |
      | direccion.coordenadas.latitud  | direccion           |
      | direccion.coordenadas.longitud | direccion           |
      | cantidadDeHuespedes            | cantidadDeHuespedes |
      | tipoDeAlojamiento              | tipoDeAlojamiento   |

  Esquema del escenario: Campos vacíos
    Cuando creo una publicación con el "<campo>" vacío
    Entonces veo un error indicado en el campo "<campoError>"
    Y veo que no hay publicaciones

    Ejemplos:
      | campo                          | campoError          |
      | titulo                         | titulo              |
      | descripcion                    | descripcion         |
      | precioPorNoche                 | precioPorNoche      |
      | direccion.pais                 | direccion           |
      | direccion.provincia            | direccion           |
      | direccion.ciudad               | direccion           |
      | direccion.municipio            | direccion           |
      | direccion.direccion            | direccion           |
      | direccion.coordenadas.latitud  | direccion           |
      | direccion.coordenadas.longitud | direccion           |
      | cantidadDeHuespedes            | cantidadDeHuespedes |
      | tipoDeAlojamiento              | tipoDeAlojamiento   |

  Escenario: Un huésped no puede crear publicaciones
    Dado que soy "huésped"
    Cuando creo una publicación con:
      | titulo                         | Departamento con vista                                 |
      | descripcion                    | Hermoso departamento con vista al mar en Mar del Plata |
      | precioPorNoche                 | 10                                                     |
      | direccion.pais                 | Argentina                                              |
      | direccion.provincia            | Buenos Aires                                           |
      | direccion.ciudad               | Mar del Plata                                          |
      | direccion.municipio            | Mar del Plata                                          |
      | direccion.direccion            | Avenida Patricio Peralta Ramos 4799                    |
      | direccion.coordenadas.latitud  | -38.0083                                               |
      | direccion.coordenadas.longitud | -57.5385                                               |
      | cantidadDeHuespedes            | 2                                                      |
      | tipoDeAlojamiento              | Alojamiento entero                                     |
      | imagenes[0].url                | google.com                                             |
    Entonces obtengo un error 403 con mensaje "Access is denied"
