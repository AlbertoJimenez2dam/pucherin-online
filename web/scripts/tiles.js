class Tile {
	constructor(id) {
		this.id = id,
        this.chips = 0
	}
}

function addTile(id) {
    tiles.set(id, new Tile(id));
}

function resetTiles() {
    tiles = new Map();
    
    for (var i = 2; i <= 11; i++) {
        addTile(i);
    }
}

function getTotalChips() {
    var chipsCount = 0;
    
    tiles.forEach(thisTile => {
        chipsCount += thisTile.chips;
    });
    
    return chipsCount;
}

function printStatus() {
    send('');
    send('- Estado del tablero -');
    
    tiles.forEach(thisTile => {
        if (thisTile.id == 7) {
            return;
        }
        
        send('Casilla ' + thisTile.id + ', número de fichas: ' + thisTile.chips);
    });
    
    send('Número de fichas en el puchero: ' + tiles.get(7).chips);
    send('');
    
    printPlayers();
}
