# language: es
Característica:
  Como huésped
  Quiero poder listar mis reservas
  Para ver en qué alojamiento voy a hospedarme

  Antecedentes:
    Dado que soy "anfitrión"
    Y que realicé una publicación con:
      | titulo | Departamento en Palermo |
    Y que soy "huésped"

  Escenario: Listado sin reservas
    Cuando listo mis reservas
    Entonces no obtengo reservas

  Escenario: Listado sin reservas pendientes
    Cuando listo mis reservas "pendientes de creación"
    Entonces no obtengo reservas

  Escenario: Listado sin reservas pendientes
    Cuando listo mis reservas "creadas"
    Entonces no obtengo reservas

  Escenario: Listado sin reservas aceptadas
    Cuando listo mis reservas "aceptadas"
    Entonces no obtengo reservas

  Escenario: Listado sin reservas aceptadas
    Cuando listo mis reservas "rechazadas"
    Entonces no obtengo reservas

  Escenario: Listado con reservas pendientes
    Dado que realicé una reserva en la publicación con título "Departamento en Palermo"
    Cuando listo mis reservas
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado                |
      | 2020-12-01  | 2020-12-07 | pendiente de creación |

  Escenario: Listado con reservas pendientes
    Dado que realicé una reserva en la publicación con título "Departamento en Palermo"
    Cuando listo mis reservas "pendientes de creación"
    Entonces veo las reservas:
      | fechaInicio | fechaFin   | estado                |
      | 2020-12-01  | 2020-12-07 | pendiente de creación |
