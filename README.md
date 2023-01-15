# pucherin-online
Implementación del antiguo juego de mesa español "El Pucherín".

Versión 1.0.

[Demo funcional, incluyendo servidor](https://albertojimenez2dam.github.io/pucherin-online/web)

[Demo funcional alternativa](https://alcosmos.net/pucherin)

**Nota:** El servidor puede fallar y dejar de crear partidas, por lo que las demos de arriba pueden no funcionar en modo online 1vs1. En ese caso, habrá que ejecutar un servidor local con los parámetros de configuración comentados en 'web_config.js'.

## Modos de juego
* **Partida local**<br>
Permite jugar a entre 1 y 5 jugadores en el mismo dispositivo.
* **Jugar contra bots**<br>
Permite jugar a un solo jugador contra entre 1 y 4 bots.
* **Modo automático**<br>
Hace que entre 1 y 5 bots jueguen automáticamente entre ellos.
* **Online 1vs1**<br>
Permite jugar en línea contra otro jugador.

## Cómo jugar
El tablero cuenta con 10 casillas, cada una con el mismo número de espacios para fichas que su número, a excepción de la casilla central 7 (puchero), la cual cuenta con 4 espacios.

Se reparten 50 fichas entre cada jugador, descartando las restantes en caso de haberlas.

Se juega por turnos. En cada turno, el jugador lanzará dos dados. El jugador pondrá una ficha en la casilla correspodiente a la suma de ambos, excepto en caso de sacar un 12, donde se llevará todas las fichas del puchero.

Las fichas que se lleve nos e añadirán al total de fichas, sino que contarán como puntos.

Si al jugador no le quedan fichas que poner, se llevará el contenido de la casilla. Si esto sucede al sacar un 12, se lleva todas las fichas del tablero y se acaba la partida.

Gana quien más puntos tenga.

## Funcionalidad extra
El juego se encuentra disponible tanto en modo tablero como en modo terminal. Ambos modos se encuentran sincronizados en todo momento, y se puede ir alternando entre ellos. Utilizar comandos hará que no aparezca una alerta.

Pulsando en el nombre de un jugador, se puede cambiar su nombre. Esta funcionalidad también se encuentra disponible para cada jugador en el modo online.

## Información del modo online 1vs1
El servidor está escrito en Python. Se encuentra centralizado en un servidor remoto, y sirve a todos los usuarios simultáneamente. No mantiene los estados de las partidas, sino que mantiene la sincronía de cada cliente entre las diferentes partidas en curso.

Es necesario instalar el módulo 'websockets' mediante Pip.

## Comandos disponibles
* **commands**<br>
    Lista los comandos disponibles.
* **chat [mensaje]**<br>
    Envía un mensaje público en el chat.
* **botmode [Número de bots (1 a 4)]**<br>
    Inicia una nueva partida contra bots.
* **newgame [número de jugadores (1 a 5)]**<br>
    Inicia una nueva partida.
* **online [nombre]**<br>
    Conecta al modo online 1vs1.
* **setname [número del jugador] [nombre]**<br>
    Cambia el nombre del jugador indicado en una partida local.
* **myname [nombre]**<br>
    Cambia tu nombre en una partida online.
* **automode [número de bots (1 a 5)]**<br>
    Inicia una nueva partida en modo automático.
* **throwdice**<br>
    Arroja un solo dado.
* **throwdices**<br>
    Arroja ambos dados al mismo tiempo.

## Protocolo del modo online 1vs1
### Cliente -> Servidor
* **hello**
* **tryauth**
* **throwdice [valor]**
* **throwdices [valor1] [valor2]**
* **chat [idUsuario] [mensaje]**
* **setname [idUsuario] [nuevoNumbre]**
* **players**

### Servidor -> Cliente
* **welcome**
* **auth**
* **started [idJugador]**
* **throwdice [valor]**
* **throwdices [valor1] [valor2]**
* **chat [idUsuario] [mensaje]**
* **chat [idUsuario] [nuevoNombre]**
* **players [numTotalJugadores]**
* **otherleft**
