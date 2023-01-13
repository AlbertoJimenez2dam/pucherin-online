# pucherin-online
Implementación del antiguo juego de mesa español "El Pucherín", con modo 1-5 jugadores en el mismo dispositivo, y modo online 1vs1.

Version 1.0.

## Cómo jugar
nose xd

## Protocolo del modo online 1vs1
### Cliente -> Servidor
* hello
* tryauth
* throwdice [valor]
* throwdices [valor1] [valor2]
* chat [idUsuario] [mensaje]
* setname [idUsuario] [nuevoNumbre]
* players

### Servidor -> Cliente
* welcome
* auth
* started [idJugador]
* throwdice [valor]
* throwdices [valor1] [valor2]
* chat [idUsuario] [mensaje]
* chat [idUsuario] [nuevoNumbre]
* players [numTotalJugadores]
* otherleft
