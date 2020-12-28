# language: es
Característica:
  Como servicio de pagos
  Quiero rechazar las reservas de los huéspedes
  Para que no se hospeden en mi alojamiento

  Antecedentes:
    Dado que el anfitrión con email "anfitrion@book.bnb" tiene una publicación "creada" con:
      | titulo | Departamento en Palermo |
    Y que el huésped con email "huesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01            |
      | fechaFin    | 2020-12-07            |

  Escenario: Rechazo de reserva
    Dado que soy el "servicio de pagos"
    Cuando el anfitrión con email "anfitrion@book.bnb" rechaza la reserva del usuario "huesped@book.bnb"
    Entonces recibo un pedido de rechazo de reserva
