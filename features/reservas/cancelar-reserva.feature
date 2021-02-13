# language: es
Característica:
  Como servicio de pagos
  Quiero cancelar la reserva de un huésped
  Para que puedan recuperar sus fondos

  Antecedentes:
    Dado que el anfitrión con email "anfitrion@book.bnb" tiene una publicación "creada" con:
      | titulo | Departamento en Palermo |

  Escenario: Cancelación de reserva
    Dado que soy el "servicio de pagos"
    Y que el huésped con email "huesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01            |
      | fechaFin    | 2020-12-07            |
    Cuando el huésped con email "huesped@book.bnb" cancela su reserva
    Entonces recibo un pedido de cancelación de reserva

  Escenario: Pagos notifica que falló la aprobación de la reserva
    Dado que soy "el servicio de pagos"
    Y que el huésped con email "huesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01            |
      | fechaFin    | 2020-12-07            |
    Y que el huésped con email "huesped@book.bnb" cancela su reserva
    Cuando notifico que falló la cancelación de dicha reserva
    Entonces veo un mensaje de confirmación

  Escenario: Pagos notifica que registró la cancelación de la reserva
    Dado que soy "el servicio de pagos"
    Y que el huésped con email "huesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01            |
      | fechaFin    | 2020-12-07            |
    Y que el huésped con email "huesped@book.bnb" cancela su reserva
    Cuando notifico que se registró la cancelación de dicha reserva
    Entonces veo un mensaje de confirmación

  Escenario: El estado de la reserva es "creada" si falla la cancelación de la reserva
    Dado que soy "huésped"
    Y que realicé una reserva en la publicación con título "Departamento en Palermo"
    Y se notifica que dicha reserva fue registrada con éxito
    Cuando cancelo mi reserva
    Y se notifica que falló la cancelación de dicha reserva
    E ingreso a la reserva
    Entonces veo una reserva con:
      | estado | creada |

  Escenario: El estado de la reserva es "cancelada" si se logra registrar la cancelación de la reserva
    Dado que soy "huésped"
    Y que realicé una reserva en la publicación con título "Departamento en Palermo"
    Y se notifica que dicha reserva fue registrada con éxito
    Cuando cancelo mi reserva
    Y se notifica que se registró la cancelación de dicha reserva
    E ingreso a la reserva
    Entonces veo una reserva con:
      | estado | cancelada |
