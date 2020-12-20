# language: es
Característica:
  Como huesped
  Quiero poder realizar búsquedas de alojamientos por cantidad de huéspedes
  Para visualizar las publicaciones y así concretar una reserva

  Antecedentes:
    Dado que existe una publicación con:
      | titulo              | Casa en Salta |
      | cantidadDeHuespedes | 8             |
    Y que existe una publicación con:
      | titulo              | Departamento en Palermo |
      | cantidadDeHuespedes | 4                       |
    Y que existe una publicación con:
      | titulo              | Hotel en Mar del Plata |
      | cantidadDeHuespedes | 2                      |
    Y que existe una publicación con:
      | titulo              | Hostel en Congreso |
      | cantidadDeHuespedes | 1                  |

  Escenario: Buscar alojamientos para familias
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con capacidad para al menos 4 huéspedes
    Entonces veo las publicaciones:
      | titulo                  |
      | Casa en Salta           |
      | Departamento en Palermo |

  Escenario: Buscar alojamientos para viajeros solos
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con capacidad para al menos 1 huéspedes
    Entonces veo las publicaciones:
      | titulo                  |
      | Casa en Salta           |
      | Departamento en Palermo |
      | Hotel en Mar del Plata  |
      | Hostel en Congreso      |

  Escenario: Buscar alojamientos con filtro de huéspedes sin resultado
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con capacidad para al menos 9 huéspedes
    Entonces no obtengo publicaciones

  Escenario: Buscar cantidad de huéspedes inválido
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con capacidad para al menos -1 huéspedes
    Entonces veo un error indicado en el campo "cantidadDeHuespedes"
