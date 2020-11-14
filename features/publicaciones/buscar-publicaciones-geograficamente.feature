# language: es
@only
Característica:
  Como huesped
  Quiero poder realizar búsquedas de alojamientos geograficamente
  Para visualizar las publicaciones y así concretar una reserva

  Antecedentes:
    Y que existe una publicacion con:
      | titulo                         | Casa en Salta   |
      | direccion.ciudad               | Ciudad de Salta |
      | direccion.coordenadas.latitud  | -24.7893        |
      | direccion.coordenadas.longitud | -65.4103        |
    Dado que existe una publicacion con:
      | titulo                         | Departamento en Palermo |
      | direccion.ciudad               | Buenos Aires            |
      | direccion.coordenadas.latitud  | -34.6002                |
      | direccion.coordenadas.longitud | -58.3909                |

  Escenario: Buscar en las mismas coordenadas
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones en un radio de 3000 metros a -34.6002, -58.3909
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |

  Escenario: Buscar en Buenos Aires
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones en un radio de 3000 metros a -34.6009, -58.3912
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |

  Escenario: Buscar en Argentina
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones en un radio de 3000000 metros a -34.6002, -58.3909
    Entonces veo las publicaciones:
      | titulo                  |
      | Departamento en Palermo |
      | Casa en Salta           |

  Escenario: Paginado
    Dado que soy "huesped"
    Cuando busco las primeras 1 publicaciones en un radio de 3000000 metros a -34.6002, -58.3909
    Entonces veo las publicaciones:
      | titulo        |
      | Casa en Salta |

  Escenario: Falla si las coordenadas son inválidas
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones en un radio de 3000 metros a 1200, -500
    Entonces veo un error indicado en el campo "coordenadas"
