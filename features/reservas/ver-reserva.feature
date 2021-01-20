# language: es
Característica:
  Como huésped
  Quiero poder visualizar una reserva realizada por mí
  Para recordar las reservas de mi viaje

  Antecedentes:
    Dado que soy "anfitrión"
    Y que realicé una publicación con:
      | titulo         | Departamento en Palermo |
      | precioPorNoche | 0.5                     |
    Y que existe el "huésped" con email "unHuesped@book.bnb"
    Y que el huésped con email "unHuesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01            |
      | fechaFin    | 2020-12-07            |
      | estado      | pendiente de creación |

  @wip
  Escenario: Ver una reserva
    Cuando ingreso a la reserva
    Entonces veo una reserva con:
      | estado         | pendiente de creación    |
      | fechaInicio    | 2020-12-01T00:00:00.000Z |
      | fechaFin       | 2020-12-07T00:00:00.000Z |
      | precioPorNoche | 0.5                      |
