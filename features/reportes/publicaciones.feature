# language: es
Característica:
  Como administrador
  Quiero poder ver la cantidad de publicaciones creadas por día
  Para medir el uso de la plataforma

  Escenario: Publicaciones por día - Completo
    Dado que existe el "anfitrión" con email "anfitrion@book.bnb"
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-01'
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-01'
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-02T12:00:00.000Z'
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-03'
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-03'
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-03'
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-05'
    Cuando consulto las publicaciones creadas por día entre '2020-02-01' y '2020-02-05'
    Entonces veo un reporte con:
      | clave      | valor |
      | 2020-02-01 | 2     |
      | 2020-02-02 | 1     |
      | 2020-02-03 | 3     |
      | 2020-02-05 | 1     |

  Escenario: Publicaciones por día - Parcial
    Dado que existe el "anfitrión" con email "anfitrion@book.bnb"
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-01'
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-01'
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-02'
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-03'
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-03'
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-03'
    Y que el anfitrión 'anfitrion@book.bnb' tiene una publicación creada el '2020-02-05'
    Cuando consulto las publicaciones creadas por día entre '2020-02-02' y '2020-02-04'
    Entonces veo un reporte con:
      | clave      | valor |
      | 2020-02-02 | 1     |
      | 2020-02-03 | 3     |
