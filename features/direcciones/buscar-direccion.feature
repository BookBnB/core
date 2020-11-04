# language: es
Característica:
  Como anfitrion
  Quiero poder buscar la dirección de mi alojamiento
  Para que los huespedes puedan llegar a esta

  Escenario: Buscar dirección existente
    Dado que soy "anfitrión"
    Cuando busco una dirección por "paseo colon 850"
    Entonces veo una dirección con:
      | pais                 | Argentina               |
      | ciudad               | Buenos Aires            |
      | direccion            | Avenida Paseo Colón 850 |
      | coordenadas.latitud  | -34.6092                |
      | coordenadas.longitud | -58.3697                |

  Escenario: Buscar dirección inexistente
    Dado que soy "anfitrión"
    Cuando busco una dirección por "una dirección inexistente"
    Entonces no encuentro direcciones
