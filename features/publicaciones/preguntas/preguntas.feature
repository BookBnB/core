# language: es
Característica:
  Como huésped
  Quiero poder realizar comentarios con consultas en una publicación
  Para poder consultarle al anfitrion mis dudas

  Antecedentes:
    Dado que existe una publicación con:
      | titulo | Casa en Salta |
    Y que soy "huésped"

  Escenario: No hay preguntas en una publicación nueva
    Cuando listo las preguntas de la publicación con título "Casa en Salta"
    Entonces no veo preguntas

  Escenario: Realizar una pregunta
    Cuando pregunto "Hay aire acondicionado?" en la publicación con título "Casa en Salta"
    Entonces veo una nueva pregunta con:
      | descripcion | Hay aire acondicionado? |

  Escenario: Ver pregunta realizada
    Cuando pregunto "Hay aire acondicionado?" en la publicación con título "Casa en Salta"
    Y listo las preguntas de la publicación con título "Casa en Salta"
    Entonces veo las preguntas:
      | descripcion             |
      | Hay aire acondicionado? |

  Escenario: Ver varias preguntas realizas
    Cuando pregunto "Hay aire acondicionado?" en la publicación con título "Casa en Salta"
    Y pregunto "Hay televisión satelital?" en la publicación con título "Casa en Salta"
    Y pregunto "A cuántas cuadras del centro está?" en la publicación con título "Casa en Salta"
    Y listo las preguntas de la publicación con título "Casa en Salta"
    Entonces veo las preguntas:
      | descripcion                        |
      | Hay aire acondicionado?            |
      | Hay televisión satelital?          |
      | A cuántas cuadras del centro está? |

  Escenario: La pregunta no puede estar vacía
    Cuando pregunto "" en la publicación con título "Casa en Salta"
    Entonces veo un error indicado en el campo "descripcion"
    Cuando listo las preguntas de la publicación con título "Casa en Salta"
    Entonces no veo preguntas
