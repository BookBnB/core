# language: es
Característica:
  Como anfitrión
  Quiero poder listar las reservas de mis alojamientos
  Para poder visualizarlas de manera rápida.

  Antecedentes:
    Dado que soy "anfitrión"
    Y que realicé una publicación con:
      | titulo | Departamento en Palermo |
    Y que existe el "huesped" con email "unHuesped@book.bnb"
    Y que el huesped con email "unHuesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01 |
      | fechaFin    | 2020-12-07 |
      | estado      | pendiente  |
    Y que existe el "huesped" con email "otroHuesped@book.bnb"
    Y que el huesped con email "otroHuesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-08 |
      | fechaFin    | 2020-12-10 |
      | estado      | pendiente  |

  Escenario: Listado sin reservas
    Dado que realicé una publicación con:
      | titulo | Casa en Salta |
    Cuando listo las reservas de la publicación con título "Casa en Salta"
    Entonces no obtengo reservas

  Escenario: Listado sin reservas pendientes
    Dado que realicé una publicación con:
      | titulo | Casa en Salta |
    Cuando listo las reservas "pendientes" de la publicación con título "Casa en Salta"
    Entonces no obtengo reservas

  Escenario: Listado sin reservas aceptadas
    Dado que realicé una publicación con:
      | titulo | Casa en Salta |
    Cuando listo las reservas "aceptadas" de la publicación con título "Casa en Salta"
    Entonces no obtengo reservas

  Escenario: Listado con varias reservas
    Cuando listo las reservas de la publicación con título "Departamento en Palermo"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado    |
      | 2020-12-01  | 2020-12-07 | pendiente |
      | 2020-12-08  | 2020-12-10 | pendiente |

  Escenario: Listado de reservas pendientes
    Cuando listo las reservas "pendientes" de la publicación con título "Departamento en Palermo"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado    |
      | 2020-12-01  | 2020-12-07 | pendiente |
      | 2020-12-08  | 2020-12-10 | pendiente |

  @wip
  Escenario: Listado de reservas aceptadas
    Dado que un huesped tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-25 |
      | fechaFin    | 2020-12-30 |
      | estado      | aceptada   |
    Y que soy "anfitrión"
    Cuando listo las reservas "aceptadas" de la publicación con título "Departamento en Palermo"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado    |
      | 2020-12-25  | 2020-12-30 | aceptada  |

  Escenario: Listado de reservas con publicación inexistente
    Dado que soy "anfitrión"
    Cuando listo las reservas de una publicación que no existe
    Entonces obtengo un error 404 con mensaje "La publicación con id .* no existe"

  Escenario: Listado de reservas de publicación que no es mía
    Dado que soy "anfitrión"
    Cuando listo las reservas de una publicación que no es mía
    Entonces obtengo un error 403 con mensaje "El usuario no es el anfitrión de la publicación"
