# language: es
Característica:
  Como huesped
  Quiero poder reservarme en un alojamiento
  Para poder alojarme en el mismo

  Escenario: Creación de reserva exitosa
    Dado que soy "huesped"
    Y que existe una publicacion
    Cuando intento hacer una reserva del '2020-12-01' al '2020-12-07' con precio 200
    Entonces veo una nueva reserva con:
      | estado         | pendiente                |
      | fechaInicio    | 2020-12-01T00:00:00.000Z |
      | fechaFin       | 2020-12-07T00:00:00.000Z |
      | precioPorNoche | 200                      |
    Y veo que está reservada a mí nombre

  Escenario: Creación de reserva con fechas invertidas
    Dado que soy "huesped"
    Y que existe una publicacion
    Cuando intento hacer una reserva del '2020-12-07' al '2020-12-01' con precio 200
    Entonces obtengo un mensaje de error "Fechas de reserva invertidas"

  Escenario: Creación de reserva con precio con decimales
    Dado que soy "huesped"
    Y que existe una publicacion
    Cuando intento hacer una reserva del '2020-12-01' al '2020-12-07' con precio 0.01
    Entonces veo una nueva reserva con:
      | estado         | pendiente                |
      | fechaInicio    | 2020-12-01T00:00:00.000Z |
      | fechaFin       | 2020-12-07T00:00:00.000Z |
      | precioPorNoche | 0.01                     |
    Y veo que está reservada a mí nombre

  Esquema del escenario: Campos de reserva faltantes
    Dado que soy "huesped"
    Y que existe una publicacion
    Cuando intento hacer una reserva sin "<campo>"
    Entonces veo un error indicado en el campo "<campo>"

    Ejemplos:
      | campo          |
      | publicacionId  |
      | fechaInicio    |
      | fechaFin       |
      | precioPorNoche |

  Esquema del escenario: Campos de reserva vacíos
    Dado que soy "huesped"
    Y que existe una publicacion
    Cuando intento hacer una reserva con "<campo>" vacío
    Entonces veo un error indicado en el campo "<campo>"

    Ejemplos:
      | campo          |
      | publicacionId  |
      | fechaInicio    |
      | fechaFin       |
      | precioPorNoche |

  Esquema del escenario: Campos inválidos
    Dado que soy "huesped"
    Y que existe una publicacion
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
      | precioPorNoche | texto          |
      | precioPorNoche | -100           |
