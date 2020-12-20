# language: es
Característica:
    Como servicio
    Quiero poder notificar la aprobación de una nueva reserva
    Para que el notificado pueda actualizar su estado acorde al evento

    Escenario: Confirmacion de aceptacion de reserva
        Dado que existe una publicación con:
        | titulo | Departamento en Palermo |
        Y que soy "huesped"
        Y intento hacer una reserva del '2020-12-01' al '2020-12-07' en la publicación con título "Departamento en Palermo"
        Y se notifica un evento para la reserva creada
        Cuando se notifica un evento de aprobacion para la reserva
        Entonces ingreso a la reserva
        Y veo una reserva con:
        | estado | aceptada |
