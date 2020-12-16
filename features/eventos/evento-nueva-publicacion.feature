# language: es
Característica:
    Como servicio
    Quiero poder notificar la creacion efectiva de una nueva publicacion
    Para que el notificado pueda actualizar su estado acorde al evento

    Escenario: Creación de publicacion
        Dado que existe una publicacion con:
        | titulo | Departamento en Palermo |
        Cuando se notifica un evento para la publicacion creada con id en contrato 3
        Entonces ingreso a la publicación con título "Departamento en Palermo"
        Y veo una publicación con:
        | estado       | Creada |
        | contratoId   | 3 |
