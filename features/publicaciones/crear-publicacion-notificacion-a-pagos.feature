# language: es
Característica:
  Como servicio de pagos
  Quiero ser notificado de la creación de una nueva publicación
  Para registrarla en el Smart Contract

  Escenario: Aviso de creación de publicación
    Dado que soy el "servicio de pagos"
    Cuando el anfitrión con email "anfitrion@boob.bnb" realiza una publicación con:
      | titulo | Departamento en Palermo |
    Entonces recibo un pedido de registro de publicación

  Escenario: No hay aviso de creación de publicación si la publicación es incorrecta
    Dado que soy el "servicio de pagos"
    Cuando el anfitrión con email "anfitrion@boob.bnb" realiza una publicación con:
      | titulo |  |
    Entonces no recibo un pedido de registro de publicación
