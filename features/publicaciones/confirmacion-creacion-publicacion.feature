# language: es
Característica:
  Como servicio de pagos
  Quiero notificar la registración exitosa de una nueva publicación
  Para luego aceptar reservas de la publicación

  Escenario: Confirmación de recepción de notificación
    Dado que soy "el servicio de pagos"
    Y que existe una publicacion con:
      | titulo | Departamento en Palermo |
    Cuando notifico que la publicación con título "Departamento en Palermo" fue registrada con éxito
    Entonces veo un mensaje de confirmación

  Escenario: Confirmación de publicación creada
    Dado que soy "huesped"
    Y que existe una publicacion con:
      | titulo | Departamento en Palermo |
    Cuando se notifica que la publicación con título "Departamento en Palermo" fue registrada con éxito
    E ingreso a la publicación con título "Departamento en Palermo"
    Entonces veo una publicación con:
      | estado | Creada |
