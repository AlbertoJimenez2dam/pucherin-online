class Player {
	constructor(id, chips) {
		this.id = id,
        this.name = 'Jugador' + id,
        this.chips = chips,
        this.points = 0
	}
}

function addPlayer(id, chips) {
    players.set(id, new Player(id, chips));
}

function getCurPlayerStr() {
    return getPlayerStr(currentPlayer);
}

function getPlayerStr(playerId) {
    return players.get(parseInt(playerId)).name + ' (' + playerId + ')';
}

function printPlayers() {
    send('- Estado de los jugadores -');
    
    players.forEach(thisPlayer => {
        send(getPlayerStr(thisPlayer.id) + ' Fichas: ' + thisPlayer.chips + ' Puntos: ' + thisPlayer.points);
    });
    
    send('');
}
