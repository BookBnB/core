# language: es
Característica:
    Como anfitrion
    Quiero poder 
    Para que el notificado pueda actualizar su estado acorde al evento

    Antecedentes:
        Dado que soy "anfitrión"
        Y que realicé una publicación con:
        | titulo | Departamento en Palermo |
        Y que existe el "huesped" con email "unHuesped@book.bnb"
        Y que el huesped con email "unHuesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
        | fechaInicio | 2020-12-01             |
        | fechaFin    | 2020-12-07             |
        | estado      | pendiente de creacion  |
        Y que existe el "huesped" con email "otroHuesped@book.bnb"
        Y que el huesped con email "otroHuesped@book.bnb" tiene una reserva en la publicación con título "Departamento en Palermo" con:
        | fechaInicio | 2020-12-08             |
        | fechaFin    | 2020-12-10             |
        | estado      | pendiente de creacion  |
    
    Escenario: Aprobación de reserva
        Cuando apruebo la reserva del usuario "unHuesped@book.bnb"
        Entonces se desencadena el proceso de aceptación del usuario "unHuesped@book.bnb"
