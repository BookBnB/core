# language: es
Característica:
  Como servicio de pagos
  Quiero ser notificado de la creación de una nueva reserva
  Para registrarla en el Smart Contract

  Antecedentes:
    Dado que existe una publicación "creada" con:
      | titulo | Departamento en Palermo |

  Escenario: Pagos notifica que la creación de la reserva fue exitosa
    Dado que soy "el servicio de pagos"
    Y que existe una reserva "pendiente" en la publicación con título "Departamento en Palermo"
    Cuando notifico que dicha reserva fue registrada con éxito
    Entonces veo un mensaje de confirmación

  Escenario: Pagos notifica que la creación de la reserva fue rechazada
    Dado que soy "el servicio de pagos"
    Y que existe una reserva "pendiente" en la publicación con título "Departamento en Palermo"
    Cuando notifico que falló la creación de dicha reserva
    Entonces veo un mensaje de confirmación

  Escenario: El estado de la reserva es "creada" si la reserva se registró correctamente en el servicio de pagos
    Dado que soy "huésped"
    Y que realicé una reserva en la publicación con título "Departamento en Palermo"
    Cuando se notifica que dicha reserva fue registrada con éxito
    E ingreso a la reserva
    Entonces veo una reserva con:
      | estado | creada |

  Escenario: El estado de la reserva es "rechazada" si la reserva no se pudo crear en el servicio de pagos
    Dado que soy "huésped"
    Y que realicé una reserva en la publicación con título "Departamento en Palermo"
    Cuando se notifica que falló la creación de dicha reserva
    E ingreso a la reserva
    Entonces veo una reserva con:
      | estado | rechazada |
