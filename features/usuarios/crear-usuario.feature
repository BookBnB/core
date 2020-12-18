# language: es
Característica:
    Como usuario
    Quiero poder registrarme en la plataforma
    Para poder hacer uso de sus funcionalidades

    Escenario: Creacion de usuario
        Dado que no existen usuario
        Cuando creo un "anfitrion" con email "anfitrion@test.com"
        Entonces veo un usuario con:
        | email     | anfitrion@test.com |
        | role      | anfitrion          |
        Y se creó la billetera correspondiente
