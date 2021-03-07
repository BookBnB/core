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

  Escenario: El servicio de pagos recibe el rechazo de reserva
    Dado que soy el "servicio de pagos"
    Cuando el anfitrión con email "anfitrion@book.bnb" rechaza la reserva del usuario "huesped@book.bnb"
    Entonces recibo un pedido de rechazo de reserva

  Escenario: El servicio de pagos confirma el rechazo de reserva
    Dado que soy el "servicio de pagos"
    Y que el anfitrión con email "anfitrion@book.bnb" rechaza la reserva del usuario "huesped@book.bnb"
    Cuando notifico que dicha reserva se rechazó con éxito
    Entonces veo un mensaje de confirmación
    Y veo que se envió una notificación al usuario con título "Reserva rechazada" y descripción "Su reserva en Departamento en Palermo ha sido rechazada!"

  Escenario: El servicio de pagos notifica que la reserva no pudo ser rechazada
    Dado que soy el "servicio de pagos"
    Y que el anfitrión con email "anfitrion@book.bnb" rechaza la reserva del usuario "huesped@book.bnb"
    Cuando notifico que falló el rechazo de dicha reserva
    Entonces veo un mensaje de confirmación

  Escenario: El estado de la reserva es "creada" si falla el rechazo de la reserva
    Dado que soy "huésped"
    Y que realicé una reserva en la publicación con título "Departamento en Palermo"
    Cuando se notifica que dicha reserva fue registrada con éxito
    Y que el anfitrión con email "anfitrion@book.bnb" rechazó mi reserva
    Cuando se notifica que falló el rechazo de dicha reserva
    E ingreso a la reserva
    Entonces veo una "reserva" con:
      | estado | creada |

  Escenario: El estado de la reserva es "rechazada" se rechazo de la reserva correctamente
    Dado que soy "huésped"
    Y que realicé una reserva en la publicación con título "Departamento en Palermo"
    Cuando se notifica que dicha reserva fue registrada con éxito
    Y que el anfitrión con email "anfitrion@book.bnb" rechazó mi reserva
    Cuando se notifica que dicha reserva se rechazó con éxito
    E ingreso a la reserva
    Entonces veo una "reserva" con:
      | estado | rechazada |
