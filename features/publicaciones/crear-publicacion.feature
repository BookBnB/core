# language: es
Característica:
  Como anfitrion
  Quiero poder dar de alta una publicacion de mi alojamiento
  Para que realicen reservas del mismo y poder cobrar su uso

  Escenario: Creación exitosa
    Dado que soy "anfitrión"
    Cuando creo una publicación con:
      | titulo                         | Departamento con vista                                 |
      | descripcion                    | Hermoso departamento con vista al mar en Mar del Plata |
      | precioPorNoche                 | 10                                                     |
      | direccion.pais                 | Argentina                                              |
      | direccion.provincia            | Buenos Aires                                           |
      | direccion.ciudad               | Mar del Plata                                          |
      | direccion.direccion            | Avenida Patricio Peralta Ramos 4799                    |
      | direccion.coordenadas.latitud  | -38.0083                                               |
      | direccion.coordenadas.longitud | -57.5385                                               |
      | cantidadDeHuespedes            | 2                                                      |
    Entonces veo una nueva publicación con:
      | titulo                         | Departamento con vista                                 |
      | descripcion                    | Hermoso departamento con vista al mar en Mar del Plata |
      | precioPorNoche                 | 10                                                     |
      | direccion.pais                 | Argentina                                              |
      | direccion.provincia            | Buenos Aires                                           |
      | direccion.ciudad               | Mar del Plata                                          |
      | direccion.direccion            | Avenida Patricio Peralta Ramos 4799                    |
      | direccion.coordenadas.latitud  | -38.0083                                               |
      | direccion.coordenadas.longitud | -57.5385                                               |
      | cantidadDeHuespedes            | 2                                                      |
    Y veo que está a mí nombre

  Esquema del escenario: Campos faltantes
    Dado que soy "anfitrión"
    Cuando creo una publicación sin "<campo>"
    Entonces veo un error indicado en el campo "<campoError>"
    Y veo que no hay publicaciones

    Ejemplos:
      | campo                          | campoError          |
      | titulo                         | titulo              |
      | descripcion                    | descripcion         |
      | precioPorNoche                 | precioPorNoche      |
      | direccion.pais                 | <direccion>         |
      | direccion.provincia            | <direccion>         |
      | direccion.ciudad               | <direccion>         |
      | direccion.direccion            | <direccion>         |
      | direccion.coordenadas.latitud  | <direccion>         |
      | direccion.coordenadas.longitud | <direccion>         |
      | cantidadDeHuespedes            | cantidadDeHuespedes |

  Esquema del escenario: Campos vacíos
    Dado que soy "anfitrión"
    Cuando creo una publicación con el "<campo>" vacío
    Entonces veo un error indicado en el campo "<campoError>"
    Y veo que no hay publicaciones

    Ejemplos:
      | campo                          | campoError          |
      | titulo                         | titulo              |
      | descripcion                    | descripcion         |
      | precioPorNoche                 | precioPorNoche      |
      | direccion.pais                 | <direccion>         |
      | direccion.provincia            | <direccion>         |
      | direccion.ciudad               | <direccion>         |
      | direccion.municipio            | <direccion>         |
      | direccion.direccion            | <direccion>         |
      | direccion.coordenadas.latitud  | <direccion>         |
      | direccion.coordenadas.longitud | <direccion>         |
      | cantidadDeHuespedes            | cantidadDeHuespedes |
