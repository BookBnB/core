# language: es
Característica:
  Como huésped
  Quiero poder realizar búsquedas de alojamientos por fechas de y checkout
  Para visualizar las publicaciones y así concretar una reserva

  Antecedentes:
    Dado que existe una publicación con:
      | titulo | Casa en Salta |
    Y que existe una publicación con:
      | titulo | Departamento en Palermo |
    Y que existen las siguentes reservas en la publicación con título "Departamento en Palermo":
      | estado   | fechaInicio | fechaFin   |
      | creada   | 2020-12-01  | 2020-12-07 |
      | aceptada | 2020-12-07  | 2020-12-10 |

  Escenario: Buscar en fecha que coincide con otras aceptadas no devuelve la publicación
    Dado que soy "huésped"
    Cuando busco las primeras 5 publicaciones entre el "2020-12-09" y el "2020-12-11"
    Entonces veo las publicaciones:
      | titulo                  |
      | Casa en Salta           |

  Escenario: Buscar en fecha que coincide con otras creadas sí la devuelve
    Dado que soy "huésped"
    Cuando busco las primeras 5 publicaciones entre el "2020-12-02" y el "2020-12-06"
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |
      | Casa en Salta           |

  Escenario: Buscar en fecha que no coincide devuelve todas
    Dado que soy "huésped"
    Cuando busco las primeras 5 publicaciones entre el "2020-12-10" y el "2020-12-12"
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |
      | Casa en Salta           |
