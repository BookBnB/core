# language: es
@only
Característica:
  Como huésped
  Quiero poder ver las publicaciones disponibles
  Para tomar una decisión de reserva

  Antecedentes:
    Dado que soy "huésped"

  Escenario: Ver publicaciones con imágenes
    Dado que existe una publicación con:
      | titulo          | Departamento en Palermo |
      | imagenes[0].url | google.com/una-imagen   |
    Cuando busco las primeras 5 publicaciones
    Entonces veo las publicaciones:
      | titulo                  | imagenes[0].url       |
      | Departamento en Palermo | google.com/una-imagen |

  Escenario: Listado sin publicaciones
    Cuando busco las primeras 5 publicaciones
    Entonces no obtengo publicaciones

  Escenario: Listar las publicaciones creadas no lista las pendientes ni las rechazadas
    Dado que existe una publicación con:
      | titulo | Departamento en Palermo |
    Y que el anfitrión con email "anfitrion@bookbnb.com" tiene una publicación "pendiente" con:
      | titulo | Casa en Salta |
    Y que el anfitrión con email "anfitrion@bookbnb.com" tiene una publicación "rechazada" con:
      | titulo | Cabaña en Mendoza |
    Cuando busco las primeras 5 publicaciones "creadas"
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |

  Escenario: Listar las publicaciones rechazadas
    Y que el anfitrión con email "anfitrion@bookbnb.com" tiene una publicación "rechazada" con:
      | titulo | Departamento en Palermo |
    Cuando busco las primeras 5 publicaciones "rechazadas"
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |

  Escenario: Listar las publicaciones pendientes
    Y que el anfitrión con email "anfitrion@bookbnb.com" tiene una publicación "pendiente" con:
      | titulo | Departamento en Palermo |
    Cuando busco las primeras 5 publicaciones "pendientes"
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |

  Escenario: Listar todas las publicaciones
    Y que existe una publicación con:
      | titulo | Departamento en Palermo |
    Y que el anfitrión con email "anfitrion@bookbnb.com" tiene una publicación "pendiente" con:
      | titulo | Casa en Salta |
    Y que el anfitrión con email "anfitrion@bookbnb.com" tiene una publicación "pendiente" con:
      | titulo | Cabaña en Mendoza |
    Cuando busco las primeras 5 publicaciones
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |
      | Casa en Salta           |
      | Cabaña en Mendoza       |
