# language: es
Característica:
  Como huesped
  Quiero poder buscar una ciudad
  Para poder ver las publicaciones asociadas a esta

  Escenario: Buscar ciudad existente
    Dado que soy "huesped"
    Cuando busco una ciudad por "potrerillos"
    Entonces veo una ciudad con:
      | pais                 | Argentina   |
      | provincia            | Mendoza     |
      | ciudad               | Potrerillos |
      | coordenadas.latitud  | -32.9608    |
      | coordenadas.longitud | -69.1974    |

  Escenario: Buscar dirección inexistente
    Dado que soy "anfitrión"
    Cuando busco una ciudad por "una ciudad inexistente"
    Entonces no encuentro ciudades

  Escenario: Buscar dirección sin consulta
    Dado que soy "anfitrión"
    Cuando busco una ciudad por ""
    Entonces veo un error indicado en el campo "consulta"
