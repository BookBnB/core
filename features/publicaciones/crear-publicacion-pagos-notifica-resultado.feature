# language: es
Característica:
  Como servicio de pagos
  Quiero notificar la registración exitosa (o no) de una nueva publicación
  Para luego aceptar reservas (o no) de la publicación

  Antecedentes:
    Dado que existe una publicación "pendiente" con:
      | titulo | Departamento en Palermo |

  Escenario: Pagos notifica que la creación de la publicación fue exitosa
    Dado que soy "el servicio de pagos"
    Cuando notifico que la publicación con título "Departamento en Palermo" fue registrada con éxito
    Entonces veo un mensaje de confirmación

  Escenario: Pagos notifica que la creación de la publicación no se pudo realizar
    Dado que soy "el servicio de pagos"
    Cuando notifico que la publicación con título "Departamento en Palermo" no pudo registrarse
    Entonces veo un mensaje de confirmación

  Escenario: El estado de la publicación es "creada" si la publicación se registró correctamente en el servicio de pagos
    Dado que soy "anfitrión"
    Cuando se notifica que la publicación con título "Departamento en Palermo" fue registrada con éxito
    E ingreso a la publicación con título "Departamento en Palermo"
    Entonces veo una publicación con:
      | titulo | Departamento en Palermo |
      | estado | Creada                  |

  Escenario: El estado de la publicación es "rechazada" si la publicación no se pudo registrar en el servicio de pagos
    Dado que soy "anfitrión"
    Cuando creo una publicación con:
      | titulo | Casa en Salta |
    Y se notifica que la publicación con título "Casa en Salta" no pudo registrarse
    E ingreso a la publicación con título "Casa en Salta"
    Entonces veo una publicación con:
      | titulo | Casa en Salta |
      | estado | Rechazada     |
