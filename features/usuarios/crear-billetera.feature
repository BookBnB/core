# language: es
Característica:
  Como servicio de pagos
  Quiero crear las billeteras de los nuevos usuarios
  Para que puedan pagar sus reservas

  Escenario: Creacion de billetera
    Dado que soy "el servicio de pagos"
    Y que mi endpoint de creación de billeteras se encuentra activo
    Cuando se registra un "anfitrion" con email "anfitrion@test.com"
    Entonces veo que se creo un usuario email "anfitrion@test.com"
