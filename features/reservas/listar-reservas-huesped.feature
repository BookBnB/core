# language: es
Característica:
  Como huesped
  Quiero poder listar mis reservas
  Para ver en qué alojamiento voy a hospedarme

  Antecedentes:
    Dado que existe el "anfitrión" con email "anfitrion@book.bnb"
    Y que el anfitrión "anfitrion@book.bnb" tiene una publicación con:
      | titulo | Departamento en Palermo |
    Y que soy "huesped"

  @wip
  Escenario: Listado sin reservas
    Cuando listo mis reservas
    Entonces no obtengo reservas

  @wip
  Escenario: Listado sin reservas pendientes
    Cuando listo mis reservas "pendientes"
    Entonces no obtengo reservas

  @wip
  Escenario: Listado sin reservas aceptadas
    Cuando listo mis reservas "aceptadas"
    Entonces no obtengo reservas

  @wip
  Escenario: Listado sin reservas aceptadas
    Cuando listo mis reservas "rechazadas"
    Entonces no obtengo reservas

  @wip
  Escenario: Listado con reservas pendientes
    Dado que realicé una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01 |
      | fechaFin    | 2020-12-07 |
      | estado      | pendiente  |
    Cuando listo mis reservas
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado    |
      | 2020-12-01  | 2020-12-07 | pendiente |

  @wip
  Escenario: Listado con reservas aceptadas
    Dado que realicé una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01 |
      | fechaFin    | 2020-12-07 |
      | estado      | pendiente  |
    Y que mi reserva en la publicación con título "Departamento en Palermo" fue "aceptada"
    Cuando listo mis reservas
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado   |
      | 2020-12-01  | 2020-12-07 | aceptada |

  @wip
  Escenario: Listado con reservas rechazadas
    Dado que realicé una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01 |
      | fechaFin    | 2020-12-07 |
      | estado      | pendiente  |
    Y que mi reserva en la publicación con título "Departamento en Palermo" fue "rechazada"
    Cuando listo mis reservas
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado    |
      | 2020-12-01  | 2020-12-07 | rechazada |

  @wip
  Escenario: Listado de reservas pendientes con reservas pendientes
    Dado que realicé una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01 |
      | fechaFin    | 2020-12-07 |
      | estado      | pendiente  |
    Cuando listo mis reservas "pendientes"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado    |
      | 2020-12-01  | 2020-12-07 | pendiente |

  @wip
  Escenario: Listado de reservas aceptadas con reservas aceptadas
    Dado que realicé una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01 |
      | fechaFin    | 2020-12-07 |
      | estado      | pendiente  |
    Y que mi reserva en la publicación con título "Departamento en Palermo" fue "aceptada"
    Cuando listo mis reservas "aceptadas"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado   |
      | 2020-12-01  | 2020-12-07 | aceptada |

  @wip
  Escenario: Listado de reservas rechazadas con reservas rechazadas
    Dado que realicé una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01 |
      | fechaFin    | 2020-12-07 |
      | estado      | pendiente  |
    Y que mi reserva en la publicación con título "Departamento en Palermo" fue "rechazada"
    Cuando listo mis reservas "rechazadas"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado    |
      | 2020-12-01  | 2020-12-07 | rechazada |
