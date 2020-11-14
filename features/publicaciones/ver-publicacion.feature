# language: es
Característica:
  Como huesped
  Quiero poder visualizar una publicacion de un alojamiento
  Para ver sus fotos y/o videos y revisar sus características.

  Escenario: Ver una publicacion
    Dado que soy "huesped"
    Y que existe una publicacion con:
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
    Cuando ingreso a la publicación con título "Departamento con vista"
    Entonces veo una publicación con:
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

#  Escenario: Ver una publicacion inexistente
#    Dado que soy "huesped"
#    Cuando ingreso a la publicación con id "91c687f1-52a7-4f1e-8755-9f0b3f551692"
#    Entonces obtengo un error 404 con mensaje "La publicación no existe"
