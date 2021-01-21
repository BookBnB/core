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
    Y que el huésped con email "unHuesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01 |
      | fechaFin    | 2020-12-07 |

  Escenario: Ver una reserva
    Cuando ingreso a la reserva
    Entonces veo una reserva con:
      | estado         | pendiente de creación |
      | fechaInicio    | 2020-12-01            |
      | fechaFin       | 2020-12-07            |
      | precioPorNoche | 0.5                   |

  Escenario: Ver una reserva con inexistente
    Cuando ingreso a la reserva con id "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    Entonces obtengo un error 404 con mensaje "La reserva con id .* no existe"
