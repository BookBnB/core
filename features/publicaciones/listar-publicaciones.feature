# language: es
Característica:
  Como huespued
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

  Escenario: Ver publicaciones sin publicaciones
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones
    Entonces veo que no hay publicaciones
