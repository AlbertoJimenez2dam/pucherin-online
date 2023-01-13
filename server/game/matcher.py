from game import match

class Matcher:
    matchID = 1
    
    pending = None
    
    def retrieve(client):
        if (Matcher.pending == None):
            Matcher.pending = match.Match(Matcher.matchID, client)
            
            Matcher.matchID += 1
            
            return Matcher.pending
        else:
            thisMatch = Matcher.pending
            thisMatch.start(client)
            Matcher.pending = None
            
            return thisMatch