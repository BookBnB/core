# language: es
Característica:
  Como servicio de pagos
  Quiero notificar la creación efectiva de una nueva reserva
  Para que el huésped y el anfitrión de la reserva sepan que la reserva está confirmada

  Antecedentes:
    Dado que existe una publicación con:
      | titulo | Departamento en Palermo |

  Escenario: Confirmación de creación de reserva
    Dado que soy "huesped"
    Cuando intento hacer una reserva del '2020-12-01' al '2020-12-07' en la publicación con título "Departamento en Palermo"
    Cuando se notifica un evento para la reserva creada
    E ingreso a la reserva
    Entonces veo una reserva con:
      | estado | pendiente de aceptacion |
