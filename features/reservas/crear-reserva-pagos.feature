# language: es
Característica:
  Como servicio de pagos
  Quiero notificar la registración exitosa de una nueva reserva
  Para que luego el anfitrión puede aceptar la reserva y recibir huéspedes

  Antecedentes:
    Dado que existe una publicación "creada" con:
      | titulo | Departamento en Palermo |

  Escenario: La reserva se crea con estado pendiente
    Dado que soy "huésped"
    Cuando intento hacer una reserva del "2020-12-01" al "2020-12-07" en la publicación con título "Departamento en Palermo"
    E ingreso a la reserva
    Entonces veo una reserva con:
      | estado | pendiente de creacion |

  Escenario: Aviso de creación de reserva
    Dado que soy el "servicio de pagos"
    Cuando el huésped con email "huesped@boob.bnb" realiza una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-01 |
      | fechaFin    | 2020-12-07 |
    Entonces recibo un pedido de registro de reserva

  Escenario: No hay aviso de creación de reserva si la reserva es incorrecta
    Dado que soy el "servicio de pagos"
    Cuando el huésped con email "huesped@boob.bnb" realiza una reserva en la publicación con título "Departamento en Palermo" con:
      | fechaInicio | 2020-12-07 |
      | fechaFin    | 2020-12-01 |
    Entonces no recibo un pedido de registro de reserva
