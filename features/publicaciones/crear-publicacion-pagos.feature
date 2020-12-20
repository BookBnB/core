# language: es
Característica:
  Como servicio de pagos
  Quiero notificar la registración exitosa de una nueva publicación
  Para luego aceptar reservas de la publicación

  Escenario: Recepción de notificación de confirmación
    Dado que soy "el servicio de pagos"
    Y que existe una publicación "pendiente" con:
      | titulo | Departamento en Palermo |
    Cuando notifico que la publicación con título "Departamento en Palermo" fue registrada con éxito
    Entonces veo un mensaje de confirmación

  Escenario: Confirmación de publicación pendiente
    Dado que soy "huésped"
    Y que existe una publicación "pendiente" con:
      | titulo | Departamento en Palermo |
    Cuando se notifica que la publicación con título "Departamento en Palermo" fue registrada con éxito
    E ingreso a la publicación con título "Departamento en Palermo"
    Entonces veo una publicación con:
      | estado | Creada |

  Escenario: Recepción de notificación de rechazo
    Dado que soy "el servicio de pagos"
    Y que existe una publicación "pendiente" con:
      | titulo | Departamento en Palermo |
    Cuando notifico que la publicación con título "Departamento en Palermo" no pudo registrarse
    Entonces veo un mensaje de confirmación

  Escenario: Rechazo de publicación pendiente
    Dado que soy "anfitrión"
    Cuando creo una publicación con:
      | titulo | Departamento en Palermo |
    Y se notifica que la publicación con título "Departamento en Palermo" no pudo registrarse
    E ingreso a la publicación con título "Departamento en Palermo"
    Entonces veo una publicación con:
      | estado | Rechazada |
