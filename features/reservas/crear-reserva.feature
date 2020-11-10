# language: es
Característica:
    Como huesped
    Quiero poder reservarme en un alojamiento
    Para poder alojarme en el mismo

    Escenario: Creación de reserva exitosa
        Dado que soy "huesped"
        Y que existe una publicacion
        Cuando intento hacer una reserva del '2020-12-01' al '2020-12-07'
        Entonces veo una nueva reserva con:
        | estado      | pendiente                |
        | fechaInicio | 2020-12-01T00:00:00.000Z |
        | fechaFin    | 2020-12-07T00:00:00.000Z |
        Y veo que está reservada a mí nombre

    Esquema del escenario: Campos de reserva faltantes
        Dado que soy "huesped"
        Y que existe una publicacion
        Cuando intento hacer una reserva sin "<campo>"
        Entonces veo un error indicado en el campo "<campo>"

        Ejemplos:
            | campo         |
            | publicacionId |
            | fechaInicio   |
            | fechaFin      |

    Esquema del escenario: Campos de reserva vacíos
        Dado que soy "huesped"
        Y que existe una publicacion
        Cuando intento hacer una reserva con "<campo>" vacío
        Entonces veo un error indicado en el campo "<campo>"

        Ejemplos:
            | campo         |
            | publicacionId |
            | fechaInicio   |
            | fechaFin      |

    Esquema del escenario: Campos de fecha inválidos
        Dado que soy "huesped"
        Y que existe una publicacion
        Cuando intento hacer una reserva con "<campo>" "<valor>"
        Entonces veo un error indicado en el campo "<campo>"

        Ejemplos:
            | campo         | valor          |
            | fechaInicio   | fecha_invalida |
            | fechaInicio   | 1605048477878  |
            | fechaInicio   | 2020-01-32     |
            | fechaFin      | fecha_invalida |
            | fechaFin      | 1605048477878  |
            | fechaFin      | 2020-01-32     |
