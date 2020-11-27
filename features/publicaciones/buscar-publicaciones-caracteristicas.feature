# language: es
Característica:
  Como huesped
  Quiero poder realizar búsquedas de alojamientos por sus característica
  Para visualizar las publicaciones y así concretar una reserva

  Antecedentes:
    Dado que existe una publicacion con:
      | titulo              | Casa en Salta      |
      | cantidadDeHuespedes | 4                  |
      | tipoDeAlojamiento   | Alojamiento entero |
    Y que existe una publicacion con:
      | titulo              | Departamento en Palermo |
      | cantidadDeHuespedes | 2                       |
      | tipoDeAlojamiento   | Habitación privada      |
    Y que existe una publicacion con:
      | titulo              | Hostel en Congreso    |
      | cantidadDeHuespedes | 1                     |
      | tipoDeAlojamiento   | Habitación compartida |
    Y que existe una publicacion con:
      | titulo              | Hotel en Mar del Plata |
      | cantidadDeHuespedes | 2                      |
      | tipoDeAlojamiento   | Habitación de hotel    |

  @wip
  Escenario: Buscar alojamientos enteros
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones de tipo "Alojamiento entero"
    Entonces veo las publicaciones:
      | titulo        |
      | Casa en Salta |

  @wip
  Escenario: Buscar habitaciones privadas
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones de tipo "Habitación privada"
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |

  @wip
  Escenario: Buscar habitaciones compartidas
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones de tipo "Habitación compartida"
    Entonces veo las publicaciones:
      | titulo             |
      | Hostel en Congreso |

  @wip
  Escenario: Buscar habitaciones de hotel
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones de tipo "Habitación de hotel"
    Entonces veo las publicaciones:
      | titulo                 |
      | Hotel en Mar del Plata |
