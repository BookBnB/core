# language: es
Característica:
  Como servicio de pagos
  Quiero aprobar las reservas de los huéspedes
  Para que puedan hospedarse

  Antecedentes:
    Dado que el anfitrión con email "anfitrion@book.bnb" tiene una publicación "creada" con:
      | titulo | Departamento en Palermo |

  Escenario: Aprobación de reserva
    Dado que soy el "servicio de pagos"
    Y que el huésped con email "huesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01            |
      | fechaFin    | 2020-12-07            |
    Cuando el anfitrión con email "anfitrion@book.bnb" aprueba la reserva del usuario "huesped@book.bnb"
    Entonces recibo un pedido de aprobación de reserva

  Escenario: Pagos notifica que falló la aprobación de la reserva
    Dado que soy "el servicio de pagos"
    Y que el huésped con email "huesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01            |
      | fechaFin    | 2020-12-07            |
    Y que el anfitrión con email "anfitrion@book.bnb" aprobó la reserva del usuario "huesped@book.bnb"
    Cuando notifico que falló la aprobación de dicha reserva
    Entonces veo un mensaje de confirmación

  Escenario: Pagos notifica que registró la aprobación de la reserva
    Dado que soy "el servicio de pagos"
    Y que el huésped con email "huesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01            |
      | fechaFin    | 2020-12-07            |
    Y que el anfitrión con email "anfitrion@book.bnb" aprobó la reserva del usuario "huesped@book.bnb"
    Cuando notifico que se registró la aprobación de dicha reserva
    Entonces veo un mensaje de confirmación
    Y veo que se envió una notificación al usuario con título "Reserva aceptada" y descripción "Su reserva ha sido aceptada!"

  Escenario: El estado de la reserva es "creada" si falla la aprobación de la reserva
    Dado que soy "huésped"
    Y que realicé una reserva en la publicación con título "Departamento en Palermo"
    Cuando se notifica que dicha reserva fue registrada con éxito
    Y que el anfitrión con email "anfitrion@book.bnb" aprobó mi reserva
    Cuando se notifica que falló la aprobación de dicha reserva
    E ingreso a la reserva
    Entonces veo una "reserva" con:
      | estado | creada |

  Escenario: El estado de la reserva es "aprobada" si se logra registrar la aprobación de la reserva
    Dado que soy "huésped"
    Y que realicé una reserva en la publicación con título "Departamento en Palermo"
    Cuando se notifica que dicha reserva fue registrada con éxito
    Y que el anfitrión con email "anfitrion@book.bnb" aprobó mi reserva
    Cuando se notifica que se registró la aprobación de dicha reserva
    E ingreso a la reserva
    Entonces veo una "reserva" con:
      | estado | aceptada |

  Escenario: Si se aprueba una reserva, otras en las mismas fechas se rechazan
    Dado que soy "huésped"

    Y que realicé una reserva del "2020-12-02" al "2020-12-05" en la publicación con título "Departamento en Palermo"
    Cuando se notifica que dicha reserva fue registrada con éxito

    Y que el huésped con email "otro@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01 |
      | fechaFin    | 2020-12-07 |
    Cuando se notifica que dicha reserva fue registrada con éxito

    Y que el anfitrión con email "anfitrion@book.bnb" aprueba la reserva del usuario "otro@book.bnb"
    Cuando se notifica que se registró la aprobación de dicha reserva

    E ingreso a mi reserva
    Entonces veo una "reserva" con:
      | estado | rechazada |
