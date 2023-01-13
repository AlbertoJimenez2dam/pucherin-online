import asyncio

from game import match, matcher
from net import listener

class Client:
    def __init__(self, id, connection):
        self.id = id
        self.connection = connection
        
        self.match = None
    
    async def run(self, input):
        print('[' + str(self.id) + '] -> ' + input)
        
        await self.processRequest(input)
    
    async def processRequest(self, input):
        input += ' '
        
        head = ''
        
        param = ''
        params = []
        paramCount = -1
        
        for thisChar in input:
            if thisChar != ' ':
                param += thisChar
            else:
                if paramCount == -1:
                    # First one is the head
                    head = param
                    param = ''
                    paramCount += 1
                else:
                    params.insert(paramCount, param);
                    param = ''
                    paramCount += 1
        
        if head == 'hello':
            await self.send('welcome')
        elif head == 'tryauth':
            await self.send('auth')
            
            self.match = matcher.Matcher.retrieve(self)
            
            if self.match.started:
                await self.match.player1.send('started 1')
                await self.match.player2.send('started 2')
        elif head == 'throwdice':
            await self.match.other(self).send('throwdice ' + params[0])
        elif head == 'throwdices':
            await self.match.other(self).send('throwdices ' + params[0] + ' ' + params[1])
        elif head == 'chat':
            await self.match.other(self).send('chat ' + ' '.join(params))
        elif head == 'setname':
            await self.match.other(self).send('setname ' + ' '.join(params))
        elif head == 'players':
            await self.send('players ' + str(listener.getPlayers()))
    
    def getMatch(self):
        return self.match
    
    async def send(self, output):
        print('[' + str(self.id) + '] <- ' + output)
        await self.connection.send(output)