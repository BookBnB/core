# language: es
@wip
Característica:
  Como huesped
  Quiero poder realizar búsquedas de alojamientos geograficamente
  Para visualizar las publicaciones y así concretar una reserva

  Antecedentes:
    Dado que existe una publicacion con:
      | titulo                         | Departamento en Palermo |
      | direccion.ciudad               | Buenos Aires            |
      | direccion.coordenadas.latitud  | -38.0083                |
      | direccion.coordenadas.longitud | -57.5385                |
    Y que existe una publicacion con:
      | titulo                         | Casa en Salta   |
      | direccion.ciudad               | Ciudad de Salta |
      | direccion.coordenadas.latitud  | -24.7893        |
      | direccion.coordenadas.longitud | -65.4103        |

  Escenario: Buscar en Buenos Aires
    Dado que soy "huesped"
    Cuando busco las primeras 5 publicaciones en un radio de 3000m a -34.6076, -58.4371
    Entonces veo las publicaciones:
      | titulo                  | direccion.coordenadas.latitud | direccion.coordenadas.longitud |
      | Departamento en Palermo | -38.0083                      | -57.5385                       |
