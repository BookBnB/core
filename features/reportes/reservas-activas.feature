# language: es
Característica:
  Como administrador
  Quiero poder ver la cantidad de reservas activas por día
  Para medir el uso de la plataforma

  Escenario: Reservas activas por día - Completo
    Dado que existe el "anfitrión" con email "anfitrion1@book.bnb"
    Dado que existe el "anfitrión" con email "anfitrion2@book.bnb"
    Dado que existe el "anfitrión" con email "anfitrion3@book.bnb"
    Y que existe el "huesped" con email "huesped1@book.bnb"
    Y que existe el "huesped" con email "huesped2@book.bnb"
    Y que existe el "huesped" con email "huesped3@book.bnb"
    Y que el anfitrión 'anfitrion1@book.bnb' tiene una publicación 'creada'
    Y que el huesped "huesped1@book.bnb" tiene una reserva aceptada del '2020-02-10' al '2020-02-15' creada el '2020-02-01'
    Y que el anfitrión 'anfitrion1@book.bnb' tiene una publicación 'creada'
    Y que el huesped "huesped2@book.bnb" tiene una reserva aceptada del '2020-02-18' al '2020-02-19' creada el '2020-02-02'
    Y que el anfitrión 'anfitrion2@book.bnb' tiene una publicación 'creada'
    Y que el huesped "huesped1@book.bnb" tiene una reserva aceptada del '2020-02-06' al '2020-02-11' creada el '2020-02-02'
    Y que el huesped "huesped2@book.bnb" tiene una reserva del '2020-02-10' al '2020-02-20' creada el '2020-02-02'
    Y que el anfitrión 'anfitrion1@book.bnb' tiene una publicación 'creada'
    Y que el huesped "huesped2@book.bnb" tiene una reserva aceptada del '2020-02-09' al '2020-02-14' creada el '2020-02-03'
    Y que el anfitrión 'anfitrion2@book.bnb' tiene una publicación 'creada'
    Y que el huesped "huesped3@book.bnb" tiene una reserva aceptada del '2020-02-22' al '2020-02-24' creada el '2020-02-05'
    Y que el huesped "huesped2@book.bnb" tiene una reserva del '2020-02-13' al '2020-02-17' creada el '2020-02-05'
    Y que el anfitrión 'anfitrion3@book.bnb' tiene una publicación 'creada'
    Y que el huesped "huesped2@book.bnb" tiene una reserva aceptada del '2020-02-13' al '2020-02-17' creada el '2020-02-05'
    Cuando consulto las reservas activas entre '2020-02-01' y '2020-02-28'
    Entonces veo un reporte con:
    | clave     | valor |
    | 2020-02-06 | 1     |
    | 2020-02-07 | 1     |
    | 2020-02-08 | 1     |
    | 2020-02-09 | 2     |
    | 2020-02-10 | 3     |
    | 2020-02-11 | 2     |
    | 2020-02-12 | 2     |
    | 2020-02-13 | 3     |
    | 2020-02-14 | 2     |
    | 2020-02-15 | 1     |
    | 2020-02-16 | 1     |
    | 2020-02-18 | 1     |
    | 2020-02-22 | 1     |
    | 2020-02-23 | 1     |
