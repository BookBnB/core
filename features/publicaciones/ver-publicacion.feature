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
