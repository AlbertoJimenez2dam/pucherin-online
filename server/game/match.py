class Match:
    def __init__(self, identifier, player1):
        self.identifier = identifier
        self.player1 = player1
        
        self.started = False
		
        print('Initialized new match with ID ' + str(identifier))
    
    def start(self, player2):
        self.started = True
        
        self.player2 = player2
        print('Match with ID ' + str(self.identifier) + ' started')
    
    def other(self, player):
        if player == self.player1:
            return self.player2
        else:
            return self.player1