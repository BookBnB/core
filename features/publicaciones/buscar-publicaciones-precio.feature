# language: es
Característica:
  Como huesped
  Quiero poder realizar búsquedas de alojamientos por precio
  Para visualizar las publicaciones y así concretar una reserva

  Antecedentes:
    Dado que existe una publicacion con:
      | titulo         | Casa en Salta |
      | precioPorNoche | 10            |
    Y que existe una publicacion con:
      | titulo         | Departamento en Palermo |
      | precioPorNoche | 20                      |
    Y que existe una publicacion con:
      | titulo         | Hotel en Mar del Plata |
      | precioPorNoche | 25                     |
    Y que existe una publicacion con:
      | titulo         | Hostel en Congreso |
      | precioPorNoche | 30                 |

  Escenario: Buscar alojamientos por precio mínimo
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con 20 como precio mínimo
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |
      | Hotel en Mar del Plata  |
      | Hostel en Congreso      |

  Escenario: Buscar alojamientos por precio mínimo sin resultados
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con 30.1 como precio mínimo
    Entonces no obtengo publicaciones

  Escenario: Buscar alojamientos por precio máximo
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con 25 como precio máximo
    Entonces veo las publicaciones:
      | titulo                  |
      | Casa en Salta           |
      | Departamento en Palermo |
      | Hotel en Mar del Plata  |

  Escenario: Buscar alojamientos por precio máximo sin resultados
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con 9 como precio máximo
    Entonces no obtengo publicaciones

  Escenario: Buscar alojamientos en rango de precios
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con precio entre 20 y 25
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |
      | Hotel en Mar del Plata  |

  Escenario: Buscar alojamientos en rango de precios sin resultados
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con precio entre 31 y 32
    Entonces no obtengo publicaciones

  Escenario: Buscar alojamientos en rango de precios invertido
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con precio entre 10 y 9
    Entonces obtengo un error 400 con mensaje "El precio por noche máximo debe ser mayor al precio por noche mínimo"

  Escenario: Buscar alojamientos por precio mínimo inválido
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con -1 como precio mínimo
    Entonces veo un error indicado en el campo "precioPorNocheMinimo"

  Escenario: Buscar alojamientos por precio máximo inválido
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones con -1 como precio máximo
    Entonces veo un error indicado en el campo "precioPorNocheMaximo"
