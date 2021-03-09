# language: es
Característica:
  Como anfitrión
  Quiero poder listar las reservas de mis alojamientos
  Para poder visualizarlas de manera rápida.

  Antecedentes:
    Dado que soy "anfitrión"
    Y que realicé una publicación con:
      | titulo | Departamento en Palermo |
    Y que existe el "huésped" con email "otroHuesped@book.bnb"
    Y que el huésped con email "otroHuesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-08            |
      | fechaFin    | 2020-12-10            |
      | estado      | pendiente de creación |
    Y que existe el "huésped" con email "unHuesped@book.bnb"
    Y que el huésped con email "unHuesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01            |
      | fechaFin    | 2020-12-07            |
      | estado      | pendiente de creación |

  Escenario: Listado sin reservas
    Dado que realicé una publicación con:
      | titulo | Casa en Salta |
    Cuando listo las reservas de la publicación con título "Casa en Salta"
    Entonces no obtengo reservas

  Escenario: Listado sin reservas pendientes
    Dado que realicé una publicación con:
      | titulo | Casa en Salta |
    Cuando listo las reservas "pendientes de creacion" de la publicación con título "Casa en Salta"
    Entonces no obtengo reservas

  Escenario: Listado sin reservas aceptadas
    Dado que realicé una publicación con:
      | titulo | Casa en Salta |
    Cuando listo las reservas "aceptadas" de la publicación con título "Casa en Salta"
    Entonces no obtengo reservas

  Escenario: Listado con varias reservas
    Cuando listo las reservas de la publicación con título "Departamento en Palermo"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado                |
      | 2020-12-01  | 2020-12-07 | pendiente de creación |
      | 2020-12-08  | 2020-12-10 | pendiente de creación |

  Escenario: Listado de reservas pendientes
    Cuando listo las reservas "pendientes de creacion" de la publicación con título "Departamento en Palermo"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado                |
      | 2020-12-01  | 2020-12-07 | pendiente de creación |
      | 2020-12-08  | 2020-12-10 | pendiente de creación |

  Escenario: Listado sin reservas aceptadas pero con pendientes
    Cuando listo las reservas "aceptadas" de la publicación con título "Departamento en Palermo"
    Entonces no obtengo reservas

  Escenario: Listado de reservas aceptadas
    Cuando apruebo la reserva del usuario "unHuesped@book.bnb"
    Y se notifica que se registró la aprobación de dicha reserva
    Y listo las reservas "aceptadas" de la publicación con título "Departamento en Palermo"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado   |
      | 2020-12-01  | 2020-12-07 | aceptada |

  Escenario: Listado de reservas rechazadas
    Cuando se notifica que dicha reserva se rechazó con éxito
    Y listo las reservas "rechazadas" de la publicación con título "Departamento en Palermo"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado    |
      | 2020-12-01  | 2020-12-07 | rechazada |

  Escenario: Listado de reservas con publicación inexistente
    Dado que soy "anfitrión"
    Cuando listo las reservas de una publicación que no existe
    Entonces obtengo un error 404 con mensaje "La publicación con id .* no existe"

  Escenario: Listado de reservas de publicación que no es mía
    Dado que soy "anfitrión"
    Cuando listo las reservas de una publicación que no es mía
    Entonces obtengo un error 403 con mensaje "El usuario no es el anfitrión de la publicación"

  Escenario: Listado de reservas del admin
    Dado que soy "admin"
    Cuando listo las reservas de la publicación con título "Departamento en Palermo"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado                |
      | 2020-12-01  | 2020-12-07 | pendiente de creación |
      | 2020-12-08  | 2020-12-10 | pendiente de creación |
