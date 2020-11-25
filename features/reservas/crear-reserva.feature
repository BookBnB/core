# language: es
Característica:
  Como huesped
  Quiero poder reservarme en un alojamiento
  Para poder alojarme en el mismo

  Antecedentes:
    Dado que existe una publicacion con:
      | titulo         | Departamento en Palermo |
      | precioPorNoche | 200                     |
    Y que soy "huesped"

  Escenario: Creación de reserva exitosa
    Cuando intento hacer una reserva del '2020-12-01' al '2020-12-07' en la publicación con título "Departamento en Palermo"
    Entonces veo una nueva reserva con:
      | publicacion.titulo | Departamento en Palermo  |
      | estado             | pendiente                |
      | fechaInicio        | 2020-12-01T00:00:00.000Z |
      | fechaFin           | 2020-12-07T00:00:00.000Z |
      | precioPorNoche     | 200                      |
    Y veo que está reservada a mí nombre

  Escenario: Creación de reserva exitosa (fechas ISO)
    Cuando intento hacer una reserva del '2020-12-01T00:00:00.000Z' al '2020-12-07T00:00:00.000Z' en la publicación con título "Departamento en Palermo"
    Entonces veo una nueva reserva con:
      | estado         | pendiente                |
      | fechaInicio    | 2020-12-01T00:00:00.000Z |
      | fechaFin       | 2020-12-07T00:00:00.000Z |
      | precioPorNoche | 200                      |
    Y veo que está reservada a mí nombre

  Escenario: Creación de reserva con fechas invertidas
    Cuando intento hacer una reserva del '2020-12-07' al '2020-12-01' en la publicación con título "Departamento en Palermo"
    Entonces obtengo un mensaje de error "Fechas de reserva invertidas"

  Esquema del escenario: Campos de reserva faltantes
    Cuando intento hacer una reserva sin "<campo>"
    Entonces veo un error indicado en el campo "<campo>"

    Ejemplos:
      | campo          |
      | publicacionId  |
      | fechaInicio    |
      | fechaFin       |

  Esquema del escenario: Campos de reserva vacíos
    Cuando intento hacer una reserva con "<campo>" vacío
    Entonces veo un error indicado en el campo "<campo>"

    Ejemplos:
      | campo          |
      | publicacionId  |
      | fechaInicio    |
      | fechaFin       |

  Esquema del escenario: Campos inválidos
    Cuando intento hacer una reserva con "<campo>" "<valor>"
    Entonces veo un error indicado en el campo "<campo>"

    Ejemplos:
      | campo          | valor          |
      | fechaInicio    | fecha_invalida |
      | fechaInicio    | 1605048477878  |
      | fechaInicio    | 2020-01-32     |
      | fechaFin       | fecha_invalida |
      | fechaFin       | 1605048477878  |
      | fechaFin       | 2020-01-32     |
