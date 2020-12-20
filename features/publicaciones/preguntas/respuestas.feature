# language: es
Característica:
  Como anfitrion
  Quiero poder responder las consultas de mis publicaciones
  Para despejar las dudas de los anfitriones y que reserven mi alojamiento

  Antecedentes:
    Dado que soy "anfitrión"
    Y que existe una publicación con:
      | titulo | Casa en Salta |
    Y que la publicacion con titulo "Casa en Salta" tiene las preguntas:
      | descripcion               |
      | Hay aire acondicionado?   |
      | Hay televisión satelital? |

  Escenario: Responder una pregunta
    Cuando respondo la pregunta "Hay aire acondicionado?" con "No, pero hay ventilador" en la publicación con título "Casa en Salta"
    Y listo las preguntas de la publicación con título "Casa en Salta"
    Entonces veo que la pregunta "Hay aire acondicionado?" tiene respuesta "No, pero hay ventilador"
    Y veo que la pregunta "Hay televisión satelital?" no tiene respuesta

  Escenario: Responder una pregunta
    Cuando respondo la pregunta "Hay aire acondicionado?" con "" en la publicación con título "Casa en Salta"
    Entonces veo un error indicado en el campo "descripcion"
    Y además
    Cuando listo las preguntas de la publicación con título "Casa en Salta"
    Entonces veo que la pregunta "Hay televisión satelital?" no tiene respuesta

  Escenario: Puedo modificar una respuesta
    Cuando respondo la pregunta "Hay aire acondicionado?" con "No, pero hay ventilador" en la publicación con título "Casa en Salta"
    Y respondo la pregunta "Hay aire acondicionado?" con "En realidad sí hay, pero en el living" en la publicación con título "Casa en Salta"
    Y listo las preguntas de la publicación con título "Casa en Salta"
    Entonces veo que la pregunta "Hay aire acondicionado?" tiene respuesta "En realidad sí hay, pero en el living"

  Escenario: Responder una pregunta que no existe
    Cuando respondo una pregunta una pregunta que no existe
    Entonces obtengo un error 404 con mensaje "La pregunta con id .* no existe"
