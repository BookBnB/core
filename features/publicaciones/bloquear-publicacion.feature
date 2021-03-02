# language: es
Característica:
  Como administrador del sistema 
  Quiero poder bloquear una publicación de un alojamiento que se encuentren en el sistema
  Para que no puedan acceder a la misma

  Antecedentes:
    Dado que existe el "administrador" con email "admin@book.bnb"
    Dado que el anfitrión con email "anfitrion@book.bnb" tiene una publicación "creada" con:
      | titulo | Casa en Salta |

  Escenario: Bloqueo de publicación
    Dado que soy el usuario "admin@book.bnb"
    Cuando bloqueo la publicación
    Y ingreso a la publicación con título "Casa en Salta"
    Entonces veo que la publicación está bloqueada

  Escenario: Anfitrión no puede acceder a la publicación
    Dado que soy el usuario "anfitrion@book.bnb"
    Y que "admin@book.bnb" bloquea la publicación
    Cuando ingreso a la publicación con título "Casa en Salta"
    Entonces obtengo un error 403 con mensaje 'Publicación bloqueada'

  Escenario: Huesped no puede acceder a la publicación
    Dado que soy "huesped"
    Y que "admin@book.bnb" bloquea la publicación
    Cuando ingreso a la publicación con título "Casa en Salta"
    Entonces obtengo un error 403 con mensaje 'Publicación bloqueada' 

  Escenario: Publicación inexistente
    Dado que soy el usuario "admin@book.bnb"
    Cuando bloqueo la publicación de id "91c687f1-52a7-4f1e-8755-9f0b3f551692"
    Entonces obtengo un error 404 con mensaje "La publicación con id 91c687f1-52a7-4f1e-8755-9f0b3f551692 no existe."

  Escenario: Intento de reserva en publicación bloqueada
    Dado que existe una publicación con:
      | titulo         | Departamento en Palermo |
      | precioPorNoche | 200                     |
    Y que "admin@book.bnb" bloquea la publicación
    Y que soy "huésped"
    Cuando intento hacer una reserva del "2020-12-01" al "2020-12-07" en la publicación con título "Departamento en Palermo"
    Entonces obtengo un error 403 con mensaje 'Publicación bloqueada'

  Escenario: Intento de aprobación de reserva en publicación bloqueada
    Dado que soy el usuario "anfitrion@book.bnb"
    Y que el huésped con email "huesped@book.bnb" tiene una reserva en la publicación con título "Casa en Salta" con:
      | fechaInicio | 2020-12-01            |
      | fechaFin    | 2020-12-07            |
    Y que "admin@book.bnb" bloquea la publicación
    Cuando el anfitrión con email "anfitrion@book.bnb" aprueba la reserva del usuario "huesped@book.bnb"
    Entonces obtengo un error 403 con mensaje 'Publicación bloqueada'

  Escenario: Intento de rechazo de reserva en publicación bloqueada
    Dado que soy el usuario "anfitrion@book.bnb"
    Y que el huésped con email "huesped@book.bnb" tiene una reserva en la publicación con título "Casa en Salta" con:
      | fechaInicio | 2020-12-01            |
      | fechaFin    | 2020-12-07            |
    Y que "admin@book.bnb" bloquea la publicación
    Cuando el anfitrión con email "anfitrion@book.bnb" rechaza la reserva del usuario "huesped@book.bnb"
    Entonces obtengo un error 403 con mensaje 'Publicación bloqueada'

  Escenario: Cancelación de reserva en publicación bloqueada
    Dado que soy el "servicio de pagos"
    Y que el huésped con email "huesped@book.bnb" tiene una reserva en la publicación con título "Casa en Salta" con:
      | fechaInicio | 2020-12-01            |
      | fechaFin    | 2020-12-07            |
    Y que "admin@book.bnb" bloquea la publicación
    Cuando el huésped con email "huesped@book.bnb" cancela su reserva
    Entonces recibo un pedido de cancelación de reserva

  Escenario: Listado omite las publicaciones bloqueadas por default
    Dado que soy 'huesped'
    Y que el anfitrión con email "anfitrion@bookbnb.com" tiene una publicación "creada" con:
      | titulo | Cabaña en Mendoza |
    Y que "admin@book.bnb" bloquea la publicación
    Cuando busco las primeras 5 publicaciones "creadas"
    Entonces veo las publicaciones:
      | titulo         |
      | Casa en Salta  |

  Escenario: Listado de publicaciones incluye bloqueadas
    Dado que soy 'huesped'
    Y que el anfitrión con email "anfitrion@bookbnb.com" tiene una publicación "creada" con:
      | titulo | Cabaña en Mendoza |
    Y que "admin@book.bnb" bloquea la publicación
    Cuando busco las primeras 5 publicaciones "creadas", incluyendo bloqueadas
    Entonces veo las publicaciones:
      | titulo            |
      | Casa en Salta     |
      | Cabaña en Mendoza |

  Escenario: Desbloqueo de publicación bloqueada
    Dado que soy el usuario "admin@book.bnb"
    Y bloqueo la publicación
    Cuando desbloqueo la publicación
    Y ingreso a la publicación con título "Casa en Salta"
    Entonces veo que la publicación no está bloqueada

  Escenario: Anfitrión intenta bloquear publicación
    Dado que soy el usuario "anfitrion@book.bnb"
    Cuando bloqueo la publicación
    Entonces obtengo un error 403 con mensaje "Access is denied"

  Escenario: Anfitrión intenta bloquear publicación
    Dado que soy "huesped"
    Cuando bloqueo la publicación
    Entonces obtengo un error 403 con mensaje "Access is denied"
