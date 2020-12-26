# language: es
Característica:
  Como servicio de pagos
  Quiero ser notificado de la creación de una nueva reserva
  Para registrarla en el Smart Contract

  Antecedentes:
    Dado que existe una publicación "creada" con:
      | titulo | Departamento en Palermo |

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
