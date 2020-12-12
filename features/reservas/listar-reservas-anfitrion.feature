  # language: es
Característica:
  Como anfitrión
  Quiero poder listar las reservas de mis alojamientos
  Para poder visualizarlas de manera rápida.

  Antecedentes:
    Dado que soy "anfitrión"
    Y que existe una publicacion con:
      | titulo | Casa en Salta |
    Y que existe una publicacion con:
      | titulo | Departamento en Palermo |
    Y que un huesped tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01 |
      | fechaFin    | 2020-12-07 |
      | estado      | pendiente  |
    Y que un huesped tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-08 |
      | fechaFin    | 2020-12-10 |
      | estado      | aceptada   |

  @wip
  Escenario: Listado sin reservas
    Cuando listo las reservas de la publicación con título "Casa en Salta"
    Entonces no obtengo reservas

  @wip
  Escenario: Listado sin reservas pendientes
    Cuando listo las reservas "pendientes" de la publicación con título "Casa en Salta"
    Entonces no obtengo reservas

  @wip
  Escenario: Listado sin reservas aceptadas
    Cuando listo las reservas "aceptadas" de la publicación con título "Casa en Salta"
    Entonces no obtengo reservas

  @wip
  Escenario: Listado con varias reservas
    Cuando listo las reservas de la publicación con título "Departamento en Palermo"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado    |
      | 2020-12-01  | 2020-12-07 | pendiente |
      | 2020-12-08  | 2020-12-10 | aceptada  |

  @wip
  Escenario: Listado de reservas pendientes
    Cuando listo las reservas "pendientes" de la publicación con título "Departamento en Palermo"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado    |
      | 2020-12-01  | 2020-12-07 | pendiente |

  @wip
  Escenario: Listado de reservas aceptadas
    Cuando listo las reservas "aceptadas" de la publicación con título "Departamento en Palermo"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado    |
      | 2020-12-08  | 2020-12-10 | aceptada  |
