# language: es
Característica:
  Como usuario
  Quiero guardar el dispositivo por el que me logueo
  Para recibir notificaciones que me interesen

  Escenario: Guardar dispositivo
    Dado que soy "anfitrión"
    Cuando guardo mi dispositivo con token "un_token"
    Entonces recibo una confirmación con mi dispositivo creado con token "un_token"

  Escenario: Guardar dispositivo reemplaza el anterior
    Dado que soy "anfitrión"
    Cuando guardo mi dispositivo con token "un_token"
    Y guardo mi dispositivo con token "otro_token"
    Entonces recibo una confirmación con mi dispositivo creado con token "otro_token"
