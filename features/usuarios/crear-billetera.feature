# language: es
Característica:
  Como servicio de pagos
  Quiero crear las billeteras de los nuevos usuarios
  Para que puedan pagar sus reservas

  Escenario: Creacion de billetera
    Dado que soy el "servicio de pagos"
    Cuando se registra un "anfitrion" con email "anfitrion@test.com"
    Entonces recibo un pedido de creación de billetera
