# language: es
Característica:
  Como servicio de pagos
  Quiero poder notificar la creación exitosa de una nueva publicación
  Para que la publicación pueda recibir reservas

  @only
  Escenario: Confirmación de creación de publicacion
    Dado que soy "huesped"
    Dado que existe una publicacion con:
      | titulo | Departamento en Palermo |
    Cuando se notifica un evento para la publicacion creada
    E ingreso a la publicación con título "Departamento en Palermo"
    Entonces veo una publicación con:
      | estado | Creada |
