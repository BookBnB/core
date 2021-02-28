# language: es
Característica:
  Como administrador
  Quiero poder ver la cantidad de reservas creadas por día
  Para medir el uso de la plataforma

  Escenario: Reservas por día - Completo
    Dado que existe el "anfitrión" con email "anfitrion@book.bnb"
    Y que existe el "huesped" con email "huesped1@book.bnb"
    Y que existe el "huesped" con email "huesped2@book.bnb"
    Y que existe el "huesped" con email "huesped3@book.bnb"
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación 'creada'
    Y que el huesped "huesped1@book.bnb" tiene una reserva del '2020-02-10' al '2020-02-15' creada el '2020-02-01'
    Y que el huesped "huesped2@book.bnb" tiene una reserva del '2020-02-10' al '2020-02-15' creada el '2020-02-02'
    Y que el huesped "huesped3@book.bnb" tiene una reserva del '2020-02-10' al '2020-02-15' creada el '2020-02-02T12:00:00.000Z'
    Y que el huesped "huesped4@book.bnb" tiene una reserva del '2020-02-10' al '2020-02-15' creada el '2020-02-03'
    Y que el huesped "huesped5@book.bnb" tiene una reserva del '2020-02-10' al '2020-02-15' creada el '2020-02-05'
    Cuando consulto las reservas creadas por día entre '2020-02-01' y '2020-02-05'
    Entonces veo un reporte con:
    | clave     | valor |
    | 2020-02-01 | 1     |
    | 2020-02-02 | 2     |
    | 2020-02-03 | 1     |
    | 2020-02-05 | 1     |

  Escenario: Reservas por día - Parcial
    Dado que existe el "anfitrión" con email "anfitrion@book.bnb"
    Y que existe el "huesped" con email "huesped1@book.bnb"
    Y que existe el "huesped" con email "huesped2@book.bnb"
    Y que existe el "huesped" con email "huesped3@book.bnb"
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación 'creada'
    Y que el huesped "huesped1@book.bnb" tiene una reserva del '2020-02-10' al '2020-02-15' creada el '2020-02-01'
    Y que el huesped "huesped2@book.bnb" tiene una reserva del '2020-02-10' al '2020-02-15' creada el '2020-02-02'
    Y que el huesped "huesped3@book.bnb" tiene una reserva del '2020-02-10' al '2020-02-15' creada el '2020-02-02'
    Y que el huesped "huesped4@book.bnb" tiene una reserva del '2020-02-10' al '2020-02-15' creada el '2020-02-03'
    Y que el huesped "huesped5@book.bnb" tiene una reserva del '2020-02-10' al '2020-02-15' creada el '2020-02-05'
    Cuando consulto las reservas creadas por día entre '2020-02-02' y '2020-02-04'
    Entonces veo un reporte con:
    | clave     | valor |
    | 2020-02-02 | 2     |
    | 2020-02-03 | 1     |
