# language: es
Característica:
  Como huésped
  Quiero poder realizar búsquedas de alojamientos por tipo de alojamiento
  Para visualizar las publicaciones y así concretar una reserva

  Antecedentes:
    Dado que existe una publicación con:
      | titulo            | Casa en Salta      |
      | tipoDeAlojamiento | Alojamiento entero |
    Y que existe una publicación con:
      | titulo            | Departamento en Palermo |
      | tipoDeAlojamiento | Habitación privada      |
    Y que existe una publicación con:
      | titulo            | Hostel en Congreso    |
      | tipoDeAlojamiento | Habitación compartida |
    Y que existe una publicación con:
      | titulo            | Hotel en Mar del Plata |
      | tipoDeAlojamiento | Habitación de hotel    |

  Escenario: Buscar alojamientos enteros
    Dado que soy "huésped"
    Cuando busco las primeras 5 publicaciones de tipo "Alojamiento entero"
    Entonces veo las publicaciones:
      | titulo        |
      | Casa en Salta |

  Escenario: Buscar habitaciones privadas
    Dado que soy "huésped"
    Cuando busco las primeras 5 publicaciones de tipo "Habitación privada"
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |

  Escenario: Buscar habitaciones compartidas
    Dado que soy "huésped"
    Cuando busco las primeras 5 publicaciones de tipo "Habitación compartida"
    Entonces veo las publicaciones:
      | titulo             |
      | Hostel en Congreso |

  Escenario: Buscar habitaciones de hotel
    Dado que soy "huésped"
    Cuando busco las primeras 5 publicaciones de tipo "Habitación de hotel"
    Entonces veo las publicaciones:
      | titulo                 |
      | Hotel en Mar del Plata |

  Escenario: Buscar tipo de alojamiento no existente
    Dado que soy "huésped"
    Cuando busco las primeras 5 publicaciones de tipo "Cabaña"
    Entonces veo un error indicado en el campo "tipoDeAlojamiento"
