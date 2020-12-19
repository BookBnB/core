# language: es
Característica:
  Como huésped
  Quiero poder ver las publicaciones disponibles
  Para tomar una decisión de reserva

  Escenario: Ver publicaciones con imágenes
    Dado que soy "huesped"
    Y que existe una publicacion con:
      | titulo          | Departamento en Palermo |
      | imagenes[0].url | google.com/una-imagen   |
    Cuando busco las primeras 5 publicaciones
    Entonces veo las publicaciones:
      | titulo                  | imagenes[0].url       |
      | Departamento en Palermo | google.com/una-imagen |

  Escenario: Listado sin publicaciones
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones
    Entonces veo que no hay publicaciones

  Escenario: No se listan las publicaciones pendientes
    Dado que soy "huesped"
    Y que el "anfitrión" con email "anfitrion@bookbnb.com" tiene una publicación "pendiente" con:
      | titulo | Departamento en Palermo |
    Cuando busco las primeras 5 publicaciones
    Entonces veo que no hay publicaciones

  Escenario: No se listan las publicaciones rechazadas
    Dado que soy "huesped"
    Y que el "anfitrión" con email "anfitrion@bookbnb.com" tiene una publicación "rechazada" con:
      | titulo | Departamento en Palermo |
    Cuando busco las primeras 5 publicaciones
    Entonces veo que no hay publicaciones
