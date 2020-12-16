# language: es
Característica:
    Como servicio
    Quiero poder notificar la creacion efectiva de una nueva reserva
    Para que el notificado pueda actualizar su estado acorde al evento

    Escenario: Creación de reserva
        Dado que existe una publicacion con:
        | titulo | Departamento en Palermo |
        Y que soy "huesped"
        Y intento hacer una reserva del '2020-12-01' al '2020-12-07' en la publicación con título "Departamento en Palermo"
        Cuando se notifica un evento para la reserva creada
        Entonces ingreso a la reserva
        Y veo una reserva con:
        | estado       | pendiente de aceptacion |
