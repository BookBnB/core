# language: es
Característica:
    Como huesped
    Quiero poder reservarme en un alojamiento
    Para poder alojarme en el mismo

    Escenario: Creación de reserva exitosa
        Dado que soy "huesped"
        Y que existe una publicacion con:
        | titulo                         | Departamento con vista                                 |
        | descripcion                    | Hermoso departamento con vista al mar en Mar del Plata |
        | precioPorNoche                 | 10                                                     |
        | direccion.pais                 | Argentina                                              |
        | direccion.provincia            | Buenos Aires                                           |
        | direccion.ciudad               | Mar del Plata                                          |
        | direccion.direccion            | Avenida Patricio Peralta Ramos 4799                    |
        | direccion.coordenadas.latitud  | -38.0083                                               |
        | direccion.coordenadas.longitud | -57.5385                                               |
        | cantidadDeHuespedes            | 2                                                      |
        Cuando intento hacer una reserva del '2020-12-01' al '2020-12-07'
        Entonces veo una nueva reserva con:
        | estado      | pendiente                  |
        | fechaInicio | 2020-12-01T00:00:00.000Z |
        | fechaFin    | 2020-12-07T00:00:00.000Z |
        Y veo que está reservada a mí nombre
