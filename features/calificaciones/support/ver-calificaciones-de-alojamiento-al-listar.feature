# language: es
Característica:
  Como huésped
  Quiero poder ver las calificaciones de los alojamientos
  Para tener una referencia de qué tan buenos son

  @only
  Escenario: Promedio de calificacion nula
    Dado que soy "huésped"
    Y que existe una publicación con:
      | titulo | Departamento en Palermo |
    Cuando busco las primeras 5 publicaciones
    Entonces veo las publicaciones:
      | titulo                  | calificacion |
      | Departamento en Palermo | null         |
