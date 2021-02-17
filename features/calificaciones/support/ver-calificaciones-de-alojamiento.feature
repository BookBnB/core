# language: es
Característica:
  Como huésped
  Quiero poder ver las calificaciones de los alojamientos
  Para tener una referencia de qué tan buenos son

  Escenario: Promedio de calificacion nula
    Dado que soy "huésped"
    Y que existe una publicación con:
      | titulo | Departamento en Palermo |
    Cuando ingreso a la publicación con título "Departamento en Palermo"
    Entonces veo una publicación con título "Departamento en Palermo" y sin calificación

  Escenario: Promedio de calificacion
    Dado que soy "huésped"
    Y que existe una publicación con:
      | titulo | Departamento en Palermo |
    Y que la publicación con título "Departamento en Palermo" tiene las calificaciones:
      | puntos | detalle                |
      | 4      |                        |
      | 2      | No me gustó el colchón |
      | 3      | El desayuno está bueno |
      | 4      |                        |
    Cuando ingreso a la publicación con título "Departamento en Palermo"
    Entonces veo una "publicación" con:
      | titulo       | Departamento en Palermo |
      | calificacion | 3.25                    |
