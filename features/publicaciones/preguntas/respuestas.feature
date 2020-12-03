# language: es
Característica:
  Como anfitrion
  Quiero poder responder las consultas de mis publicaciones
  Para despejar las dudas de los anfitriones y que reserven mi alojamiento

  Antecedentes:
    Dado que soy "anfitrión"
    Y que existe una publicacion con:
      | titulo | Casa en Salta |
    Y que la publicacion con titulo "Casa en Salta" tiene las preguntas:
      | descripcion               |
      | Hay aire acondicionado?   |
      | Hay televisión satelital? |

  Escenario: Responder una pregunta
    Cuando respondo la pregunta "Hay aire acondicionado?" con "No, pero hay ventilador" en la publicación con título "Casa en Salta"
    Y listo las preguntas de la publicación con título "Casa en Salta"
    Entonces veo que la pregunta "Hay aire acondicionado?" tiene respuesta "No, pero hay ventilador"
    Y que la pregunta "Hay televisión satelital?" no tiene respuesta