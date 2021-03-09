# language: es
Característica:
  Como huésped
  Quiero poder ver las calificaciones de los alojamientos
  Para tener una referencia de qué tan buenos son

  Escenario: Promedio de calificacion nula
    Dado que soy "huésped"
    Y que existe una publicación con:
      | titulo | Departamento en Palermo |
    Cuando busco las primeras 5 publicaciones
    Entonces veo las publicaciones:
      | titulo                  | calificacion |
      | Departamento en Palermo | null         |

  Escenario: Promedio de calificacion no nula
    Dado que soy "huésped"
    Y que existe una publicación con:
      | titulo | Departamento en Palermo |
    Y que la publicación con título "Departamento en Palermo" tiene las calificaciones:
      | puntos | detalle                |
      | 4      |                        |
      | 2      | No me gustó el colchón |
      | 3      | El desayuno está bueno |
      | 4      |                        |
    Cuando busco las primeras 5 publicaciones
    Entonces veo las publicaciones:
      | titulo                  | calificacion |
      | Departamento en Palermo | 3.25         |
