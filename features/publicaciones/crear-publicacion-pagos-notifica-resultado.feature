# language: es
Característica:
  Como servicio de pagos
  Quiero notificar la registración exitosa (o no) de una nueva publicación
  Para luego aceptar reservas (o no) de la publicación

  Escenario: Pagos notifica que la creación de la publicación fue exitosa
    Dado que soy "el servicio de pagos"
    Y que existe una publicación "pendiente" con:
      | titulo | Departamento en Palermo |
    Cuando notifico que la publicación con título "Departamento en Palermo" fue registrada con éxito
    Entonces veo un mensaje de confirmación

  Escenario: Pagos notifica que la creación de la publicación no se pudo realizar
    Dado que soy "el servicio de pagos"
    Y que existe una publicación "pendiente" con:
      | titulo | Departamento en Palermo |
    Cuando notifico que la publicación con título "Departamento en Palermo" no pudo registrarse
    Entonces veo un mensaje de confirmación

  Escenario: El estado de la publicación es "creada" si la publicación se registró correctamente en el servicio de pagos
    Dado que soy "huésped"
    Y que existe una publicación "pendiente" con:
      | titulo | Departamento en Palermo |
    Cuando se notifica que la publicación con título "Departamento en Palermo" fue registrada con éxito
    E ingreso a la publicación con título "Departamento en Palermo"
    Entonces veo una publicación con:
      | titulo | Departamento en Palermo |
      | estado | Creada                  |

  Escenario: El estado de la publicación es "rechazada" si la publicación no se pudo registrar en el servicio de pagos
    Dado que soy "anfitrión"
    Cuando creo una publicación con:
      | titulo | Departamento en Palermo |
    Y se notifica que la publicación con título "Departamento en Palermo" no pudo registrarse
    E ingreso a la publicación con título "Departamento en Palermo"
    Entonces veo una publicación con:
      | titulo | Departamento en Palermo |
      | estado | Rechazada |
