# language: es
Característica:
  Como huesped
  Quiero poder visualizar una publicacion de un alojamiento
  Para ver sus fotos y/o videos y revisar sus características.

  Escenario: Ver una publicacion
    Dado que soy "huésped"
    Y que existe una publicación con:
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
      | tipoDeAlojamiento              | Alojamiento entero                                      |
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
      | tipoDeAlojamiento              | Alojamiento entero                                      |

  Escenario: Ver una publicacion inexistente
    Dado que soy "huésped"
    Cuando ingreso a la publicación con id "91c687f1-52a7-4f1e-8755-9f0b3f551692"
    Entonces obtengo un error 404 con mensaje "La publicación con id 91c687f1-52a7-4f1e-8755-9f0b3f551692 no existe."

  Escenario: Ver una publicacion con id inválido
    Dado que soy "huésped"
    Cuando ingreso a la publicación con id "algo que no es un uuid"
    Entonces veo un error indicado en el campo "id"

  Escenario: Los huéspedes no ven las publicaciones rechazadas
    Dado que soy "huésped"
    Y que el anfitrión con email "anfitrion@bookbnb.com" tiene una publicación "rechazada" con:
      | titulo | Departamento en Palermo |
    Cuando ingreso a la publicación con título "Departamento en Palermo"
    Entonces obtengo un error 404 con mensaje "La publicación con id .* no existe."

  Escenario: Los no dueños de una publicación no la pueden ver si está rechazada
    Dado que soy "anfitrión"
    Y que el anfitrión con email "anfitrion@bookbnb.com" tiene una publicación "rechazada" con:
      | titulo | Departamento en Palermo |
    Cuando ingreso a la publicación con título "Departamento en Palermo"
    Entonces obtengo un error 404 con mensaje "La publicación con id .* no existe."

  Escenario: El dueño de una publicación pueden su publicación si está rechazada
    Dado que soy "anfitrión"
    Y que realicé una publicación con:
      | titulo | Departamento en Palermo |
    Y se notifica que la publicación con título "Departamento en Palermo" no pudo registrarse
    Cuando ingreso a la publicación con título "Departamento en Palermo"
    Entonces veo una publicación con:
      | titulo | Departamento en Palermo |
