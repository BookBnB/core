# language: es
Característica:
  Como anfitrión
  Quiero poder listar las reservas de mis alojamientos
  Para poder visualizarlas de manera rápida.

  Antecedentes:
    Dado que existe una publicacion con:
      | titulo | Departamento en Palermo |
    Y que un huesped tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01 |
      | fechaFin    | 2020-12-07 |
      | estado      | pendiente  |
    Y que un huesped tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-08 |
      | fechaFin    | 2020-12-10 |
      | estado      | pendiente  |

  Escenario: Listado sin reservas
    Dado que existe una publicacion con:
      | titulo | Casa en Salta |
    Y que soy "anfitrión"
    Cuando listo las reservas de la publicación con título "Casa en Salta"
    Entonces no obtengo reservas

  Escenario: Listado sin reservas pendientes
    Dado que existe una publicacion con:
      | titulo | Casa en Salta |
    Y que soy "anfitrión"
    Cuando listo las reservas "pendientes" de la publicación con título "Casa en Salta"
    Entonces no obtengo reservas

  Escenario: Listado sin reservas aceptadas
    Dado que existe una publicacion con:
      | titulo | Casa en Salta |
    Y que soy "anfitrión"
    Cuando listo las reservas "aceptadas" de la publicación con título "Casa en Salta"
    Entonces no obtengo reservas

  @only
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

  Escenario: Listado de reservas con publicacion inexistente
    Dado que soy "anfitrión"
    Cuando listo las reservas de una publicación que no existe
    Entonces obtengo un error 404 con mensaje "La publicación con id .* no existe"
