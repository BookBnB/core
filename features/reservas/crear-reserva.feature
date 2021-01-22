# language: es
Característica:
  Como huésped
  Quiero poder reservarme en un alojamiento
  Para poder alojarme en el mismo

  Antecedentes:
    Dado que existe una publicación con:
      | titulo         | Departamento en Palermo |
      | precioPorNoche | 200                     |
    Y que soy "huésped"

  Escenario: Creación de reserva exitosa
    Cuando intento hacer una reserva del "2020-12-01" al "2020-12-07" en la publicación con título "Departamento en Palermo"
    Entonces veo una nueva reserva con:
      | publicacion.titulo | Departamento en Palermo  |
      | estado             | pendiente de creación    |
      | fechaInicio        | 2020-12-01T00:00:00.000Z |
      | fechaFin           | 2020-12-07T00:00:00.000Z |
      | precioPorNoche     | 200                      |
    Y veo que está reservada a mí nombre

  Escenario: La reserva se crea con estado pendiente
    Dado que soy "huésped"
    Cuando intento hacer una reserva del "2020-12-01" al "2020-12-07" en la publicación con título "Departamento en Palermo"
    Entonces veo una nueva reserva con:
      | estado | pendiente de creación |

  Escenario: Creación de reserva exitosa (fechas ISO)
    Cuando intento hacer una reserva del "2020-12-01T00:00:00.000Z" al "2020-12-07T00:00:00.000Z" en la publicación con título "Departamento en Palermo"
    Entonces veo una nueva reserva con:
      | estado         | pendiente de creación    |
      | fechaInicio    | 2020-12-01T00:00:00.000Z |
      | fechaFin       | 2020-12-07T00:00:00.000Z |
      | precioPorNoche | 200                      |
    Y veo que está reservada a mí nombre

  Escenario: Creación de reserva con fechas invertidas
    Cuando intento hacer una reserva del "2020-12-07" al "2020-12-01" en la publicación con título "Departamento en Palermo"
    Entonces obtengo un mensaje de error "Fechas de reserva invertidas"

  Esquema del escenario: Campos de reserva faltantes
    Cuando intento hacer una reserva sin "<campo>"
    Entonces veo un error indicado en el campo "<campo>"

    Ejemplos:
      | campo         |
      | publicacionId |
      | fechaInicio   |
      | fechaFin      |

  Esquema del escenario: Campos de reserva vacíos
    Cuando intento hacer una reserva con "<campo>" vacío
    Entonces veo un error indicado en el campo "<campo>"

    Ejemplos:
      | campo         |
      | publicacionId |
      | fechaInicio   |
      | fechaFin      |

  Esquema del escenario: Campos inválidos
    Cuando intento hacer una reserva con "<campo>" "<valor>"
    Entonces veo un error indicado en el campo "<campo>"

    Ejemplos:
      | campo       | valor          |
      | fechaInicio | fecha_invalida |
      | fechaInicio | 1605048477878  |
      | fechaInicio | 2020-01-32     |
      | fechaFin    | fecha_invalida |
      | fechaFin    | 1605048477878  |
      | fechaFin    | 2020-01-32     |

  Escenario: Un anfitrión no puede realizar reservas
    Dado que soy "anfitrión"
    Cuando intento hacer una reserva del "2020-12-01" al "2020-12-07" en la publicación con título "Departamento en Palermo"
    Entonces obtengo un error 403 con mensaje "Access is denied"

  Escenario: No se puede crear una reserva en una publicación que se encuentra pendiente
    Dado que soy "huésped"
    Y que existe una publicación "pendiente" con:
      | titulo         | Casa en Salta |
      | precioPorNoche | 200           |
    Cuando intento hacer una reserva del "2020-12-01" al "2020-12-07" en la publicación con título "Casa en Salta"
    Entonces obtengo un error 400 con mensaje "No se puede crear una reserva en esta publicación porque se encuentra en estado Pendiente de creación"
