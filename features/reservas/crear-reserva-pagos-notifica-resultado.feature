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
    Cuando notifico que dicha reserva fue rechazada
    Entonces veo un mensaje de confirmación
