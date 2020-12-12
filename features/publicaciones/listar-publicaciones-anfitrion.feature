# language: es
Característica:
  Como anfitrion
  Quiero poder listar mis publicaciones realizadas
  Para administrarlas

  Antecedentes:
    Dado que existe el "anfitrión" con email "unanfitrion@test.test"
    Y que el anfitrión "unanfitrion@test.test" tiene una publicación con:
      | titulo | Casa en Salta |
    Y que el anfitrión "unanfitrion@test.test" tiene una publicación con:
      | titulo | Departamento en Palermo |

  Escenario: Listado de mis publicaciones
    Dado que soy "anfitrión"
    Cuando creo una publicación con:
      | titulo          | Cabaña Tres Lagos     |
      | imagenes[0].url | google.com/una-imagen |
    Y listo mis publicaciones
    Entonces veo las publicaciones:
      | titulo            | imagenes[0].url       |
      | Cabaña Tres Lagos | google.com/una-imagen |

  Escenario: Listado sin publicaciones
    Dado que soy "anfitrión"
    Cuando listo mis publicaciones
    Entonces no obtengo publicaciones

  Escenario: No puedo ver las publicaciones de otro anfitrión
    Dado que soy "anfitrión"
    Cuando listo las publicaciones del anfitrion "unanfitrion@test.test"
    Entonces obtengo un error 403 con mensaje "Access is denied"

  Escenario: Ver publicaciones de un id inválido
    Dado que soy "anfitrión"
    Cuando listo las publicaciones del anfitrion de id "uuidinvalido"
    Entonces veo un error indicado en el campo "id"

  Escenario: No puede ver publicaciones si no soy anfitrión
    Dado que soy "huesped"
    Cuando listo mis publicaciones
    Entonces obtengo un error 403 con mensaje "Access is denied"
