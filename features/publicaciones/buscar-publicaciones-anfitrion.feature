# language: es
Característica:
  Como anfitrion
  Quiero poder listar mis publicaciones realizadas 
  Para administrarlas

  Antecedentes:
    Dado que existe un anfitrión "unanfitrion@test.test"
    Y que existe un anfitrión "otroanfitrion@test.test"
    Y que el anfitrión "unanfitrion@test.test" tiene una publicación con:
        | titulo                         | Casa en Salta   |
        | direccion.ciudad               | Ciudad de Salta |
        | direccion.coordenadas.latitud  | -24.7893        |
        | direccion.coordenadas.longitud | -65.4103        |
    Y que el anfitrión "unanfitrion@test.test" tiene una publicación con:
        | titulo                         | Departamento en Palermo |
        | direccion.ciudad               | Buenos Aires            |
        | direccion.coordenadas.latitud  | -34.6002                |
        | direccion.coordenadas.longitud | -58.3909                |
    Y que el anfitrión "otroanfitrion@test.test" tiene una publicación con:
        | titulo                         | Cabaña Tres Lagos |
        | direccion.ciudad               | Miramar           |
        | direccion.coordenadas.latitud  | -37.3420          |
        | direccion.coordenadas.longitud | -57.0306          |

  Escenario: Listado de publicaciones de anfitrión específico
    Cuando listo las publicaciones del anfitrion 'unanfitrion@test.test'
    Entonces veo las publicaciones:
        | titulo                  |
        | Casa en Salta           |
        | Departamento en Palermo |

  @only
  Escenario: Ver publicaciones de un anfitrión inexistente
    Cuando listo las publicaciones del anfitrion "otro@test.test"
    Entonces no obtengo publicaciones

  Escenario: Ver publicaciones de un id inválido
    Cuando listo las publicaciones del anfitrion de id "uuidinvalido"
    Entonces veo un error indicado en el campo "id"
