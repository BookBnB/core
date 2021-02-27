# language: es
Característica:
  Como usuario
  Quiero guardar el dispositivo por el que me logueo
  Para recibir notificaciones que me interesen

  Escenario: Guardar dispositivo
    Dado que soy "anfitrión"
    Cuando guardo mi dispositivo
    Entonces recibo una confirmación con mi dispositivo creado

