# language: es
Característica:
  Como huésped
  Quiero poder calificar el alojamiento
  Para así poder brindar mi opinión sobre este

  Escenario: Calificacion sin detalle
    Dado que soy "huésped"
    Y que existe una publicación con:
      | titulo | Departamento en Palermo |
    Cuando califico el alojamiento con título "Departamento en Palermo" con 4 puntos
    Entonces veo una nueva "calificación" con:
      | puntos  | 4 |
      | detalle |   |

  Escenario: Calificacion con detalle
    Dado que soy "huésped"
    Y que existe una publicación con:
      | titulo | Departamento en Palermo |
    Cuando califico el alojamiento con título "Departamento en Palermo" con 4 puntos y detalle "Me gustó el desayuno"
    Entonces veo una nueva "calificación" con:
      | puntos  | 4                    |
      | detalle | Me gustó el desayuno |
