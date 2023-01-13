import asyncio
import websockets

import config

from net import client

clients = {}
clientCount = 1

async def start():
    host = config.getValue('connection', 'host')
    port = config.getValueInt('connection', 'port')
	
    print('Listening for WebSockets in ' + host + ' port ' + str(port))
	
    async with websockets.serve(newConnection, host, port):
        await asyncio.Future()

async def newConnection(websocket):
    global clients, clientCount
    
    print('New client connected')
    
    thisClient = client.Client(clientCount, websocket)
    
    clients[clientCount] = thisClient
    
    clientCount += 1
    
    isGoing = True
    
    while isGoing:
        try:
            input = await websocket.recv()
            
            await thisClient.run(input)
        except:
            isGoing = False
            
            clients.pop(thisClient.id, None)
            
            if thisClient.getMatch() != None:
                otherMatch = thisClient.getMatch().other(thisClient)
                
                if otherMatch != None:
                    await otherMatch.send('otherleft')
            
            print('Client disconnected')
            
            await websocket.close()
    
def getPlayers():
    # -1 in order to not count current status check connection
    return len(clients) - 1