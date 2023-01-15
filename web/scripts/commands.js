
var commands = new Map();

class Command {
	constructor(name, params, format, description, requiresMatch, process) {
		this.name = name,
        this.params = params,
        this.format = format,
        this.description = description,
        this.requiresMatch = requiresMatch,
        this.process = process
	}
}

function addCommand(name, params, format, description, requiresMatch, process) {
    commands.set(name, new Command(
        name,
        params,
        format,
        description,
        requiresMatch,
        process
    ));
}

addCommand('commands', 0, '', 'Lista los comandos disponibles', false, (params) => {
	var tempBuffer = '';
	
	commands.forEach(thisCommand => {
		tempBuffer += thisCommand.name + ' ' + thisCommand.format + '<br>';
		tempBuffer += '&nbsp;&nbsp;&nbsp;&nbsp;' + thisCommand.description + '.<br>';
	});
	
    send(tempBuffer);
});

addCommand('chat', null, '[mensaje]', 'Envía un mensaje público en el chat', false, (params) => {
    if (isOnline) {
        socket.send('chat ' + onlinePlayer + ' ' + params.join(' '));
    } else {
        send('No estás conectado.');
    }
});

addCommand('botmode', 1, '[Número de bots (1 a 4)]', 'Inicia una nueva partida contra bots', false, (params) => {
    if (isOnline && hasStarted) {
        sendMore('No puedes crear una nueva partida mientras estás en modo online.');
        
        return;
    }
    
    if (isNaN(params[0]) || params[0] < 1 || params[0] > 4) {
        sendMore('El número de jugadores debe estar entre 1 y 4.');
    } else {
        isBotMode = true;
        
        newMatch(parseInt(params[0]) + 1);
    }
});

addCommand('newgame', 1, '[número de jugadores (1 a 5)]', 'Inicia una nueva partida', false, (params) => {
    if (isOnline && hasStarted) {
        sendMore('No puedes crear una nueva partida mientras estás en modo online.');
        
        return;
    }
    
    if (isNaN(params[0]) || params[0] < 1 || params[0] > 5) {
        sendMore('El número de jugadores debe estar entre 1 y 5.');
    } else {
        newMatch(params[0]);
    }
});

addCommand('online', 1, '[nombre]', 'Conecta al modo online 1vs1', false, (params) => {
	futureOnlineName = params[0];
	
	if (futureOnlineName != '') {
		if (isOnline && hasStarted) {
			sendMore('No puedes conectarte al modo online 1vs1 mientras estás en una partida online.');
		} else {
			doOnline();
		}
	} else {
		sendMore('Nombre inválido.');
	}
});

addCommand('setname', 2, '[número del jugador] [nombre]', 'Cambia el nombre del jugador indicado en una partida local', true, (params) => {
	if (isOnline) {
		send(`Comando no disponible en modo online. Utiliza 'myname [nombre]'.`);
		
		return;
	}
	
	if (params[1] == '') {
		send(`Nombre inválido.`);
		
		return;
	}
	
    if (isNaN(params[0]) || params[0] < 1 || params[0] > playersCount) {
        send('Número de jugador inválido. En esta partida hay ' + playersCount + ' jugadores.');
    } else {
        players.get(parseInt(params[0])).name = params[1];
        
        send('Nombre del jugador ' + params[0] + ' cambiado a ' + params[1] + '.');
        
        if (isOnline) {
            socket.send('setname ' + params[0] + ' ' + params[1]);
        }
    }
});

addCommand('myname', 1, '[nombre]', 'Cambia tu nombre en una partida online', true, (params) => {
	if (!isOnline) {
		send(`Comando solo disponible en modo online. Utiliza 'setname [número del jugador] [nombre]'.`);
		
		return;
	}
	
	if (params[0] == '') {
		send(`Nombre inválido.`);
		
		return;
	}
	
    if (params[0] != null) {
        players.get(onlinePlayer).name = params[0];
        
        send('Nombre cambiado a ' + params[0] + '.');
        
        socket.send('setname ' + onlinePlayer + ' ' + params[0]);
	}
});

addCommand('automode', 1, '[número de bots (1 a 5)]', 'Inicia una nueva partida en modo automático', false, (params) => {
    if (isOnline && hasStarted) {
        sendMore('No puedes crear una nueva partida mientras estás en modo online.');
        
        return;
    }
    
    if (isNaN(params[0]) || params[0] < 1 || params[0] > 5) {
        sendMore('El número de jugadores debe estar entre 1 y 5.');
    } else {
        startAuto(params[0]);
    }
});

addCommand('throwdice', 0, '', 'Arroja un solo dado', true, (params) => {
    if (isOnline && currentPlayer != onlinePlayer && justSent) {
        sendMore('¡No es tu turno, ' + getCurPlayerStr() + '!');
        
        return;
    }
    
    var thisDice = generateDice();
    
    if (lastThrow != 0) {
        thisDice = lastThrow;
        lastThrow = 0;
    } else if (isOnline) {
        socket.send('throwdice ' + thisDice);
    }
    
    if (dice1Value == 0) {
        dice1Value = thisDice;
        
        send('Dado 1 arrojado por ' + getCurPlayerStr() + '. Obtiene un ' + thisDice + '. Esperando al segundo dado.');
        
        if (isTableMode) {
            tryAlert('Dado 1 arrojado por ' + getCurPlayerStr() + '. Obtiene un ' + thisDice + '. Esperando al segundo dado.');
        }
    } else {
        dice2Value = thisDice;
        
        send('Dado 2 arrojado por ' + getCurPlayerStr() + '. Obtiene un ' + thisDice + '.');
        
        if (isTableMode) {
            tryAlert('Dado 2 arrojado por ' + getCurPlayerStr() + '. Obtiene un ' + thisDice + '.')
        }
        
        processTurn();
    }
});

addCommand('throwdices', 0, '', 'Arroja ambos dados el mismo tiempo', true, (params) => {
    if (isOnline && currentPlayer != onlinePlayer && justSent) {
        sendMore('¡No es tu turno, ' + getCurPlayerStr() + '!');
        
        return;
    }
    
    var thisDice1 = generateDice();
    var thisDice2 = generateDice();
    
    if (lastThrow1 != 0) {
        thisDice1 = lastThrow1;
        lastThrow1 = 0;
    }
    
    if (lastThrow2 != 0) {
        thisDice2 = lastThrow2;
        lastThrow2 = 0;
    } else if (isOnline) {
        socket.send('throwdices ' + thisDice1 + ' ' + thisDice2);
    }
    
    if (dice1Value == 0) {
        dice1Value = thisDice1;
        dice2Value = thisDice2;
        
        send('Dado 1 arrojado por ' + getCurPlayerStr() + '. Obtiene un ' + thisDice1 + '.');
        send('Dado 2 arrojado por ' + getCurPlayerStr() + '. Obtiene un ' + thisDice2 + '.');
        
        processTurn();
    } else {
        send(getCurPlayerStr() + ` ha tratado de arrojar ambos dados simultáneamente `
                + `tras arrojar el primer dado, el cual tiene un ` + dice1Value
                + `. Ahora debe arrojar el segundo dado con 'throwdice' porque no lo ha pensado mucho.`);
    }
});
