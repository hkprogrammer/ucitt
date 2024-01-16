
from collections import defaultdict


class Player:
    def __init__(self, name, initialRating):
        self.name = name
        self.rating = initialRating
        self.pass1Gained = 0
        self.pass1Final = self.rating
        self.pass2Adjustment = self.rating
        self.pass3Adjustment = self.rating
        self.finalRating = self.rating
        
        
    def setPass1Gained(self, p1Gain):
        self.pass1Gained = p1Gain
        
    def setPass1Final(self, p1Final):
        self.pass1Final = p1Final
        
    def getPass1Gained(self):
        return self.pass1Gained
    
    def getPass1Final(self):
        return self.pass1Final
    
    def setPass2Adjustment(self,p2):
        self.pass2Adjustment = p2
        
    def getPass2Adjustment(self):
        return self.pass2Adjustment
    
    
    def getName(self):
        return self.name
    
    def getRating(self):
        return self.rating
    
    def setNewRating(self, rating):
        try:
            self.rating = int(rating)
        except ValueError:
            print(f"rating={rating} is not an integer")
            
    def __str__(self):
        return f"{self.name}({self.rating})"
    
    def __repr__(self):    
        return self.__str__()
    
    def __eq__(self,o):
        if not isinstance(o, Player):
            return False
        return True if self.getName() == o.getName() and self.getRating() == o.getRating() else False
    
    def __hash__(self):
        return hash(self.__str__())
        
    
    
class Match:
    def __init__(self, player1: Player, player2: Player, player1Score: int, player2Score: int, winner:Player):
        self.player1 = player1
        self.player2 = player2
        self.player1Score = player1Score
        self.player2Score = player2Score
        self.winner = winner
        
    def getPlayers(self):
        return (self.player1, self.player2)
    
    def getPlayer1(self):
        return self.player1
    
    def getPlayer2(self):
        return self.player2
    
    def getWinner(self):
        return self.winner
    
    def getOpponent(self, player):
        return self.player1 if player != self.player1 else self.player2
    
    def __str__(self):
        return f"{self.player1} {self.player1Score}-{self.player2Score} {self.player2}" if self.player1 == self.winner else f"{self.player2Score} {self.player2}-{self.player1} {self.player1Score}"
        
    def __repr__(self):
        return f"Match({self.player1}, {self.player2}, {self.player1Score}, {self.player2Score}, {self.winner})"





class Tournament:
    def __init__(self, tournamentName, tournamentDate, tournamentType, listOfPlayers: list[Player]):
        self.tournamentName = tournamentName
        self.tournamentDate = tournamentDate
        self.tournamentType = tournamentType
        self.listOfPlayers = listOfPlayers
        self.matches = []
        
    def reportScore(self, player1, player2, score1, score2, winner):
        #guarnatee player1 player2 to be Player object
        if not isinstance(player1, Player) and not isinstance(player2, Player):
            for i in self.listOfPlayers:
                if i.getName() == player1:
                    player1 = i
                if i.getName() == player2:
                    player2 = i
        
        
        match = Match(player1, player2, score1, score2, winner)
        self.matches.append(match)
        
        
    def getListOfPlayers(self):
        return self.listOfPlayers
        
    def getMatches(self):
        matches = defaultdict(list)
        
        
        for match in self.matches:
            if match not in matches[match.getPlayer1().getName()]:
                matches[match.getPlayer1().getName()].append(match)
            
            if match not in matches[match.getPlayer2().getName()]:
                matches[match.getPlayer2().getName()].append(match)
    
        return matches

    
    


"""


Hitoki 3-2 Robin
Hitoki 3-1 Nathan
Robin 3-0 Nathan


"""
    
def testerTournament():
    hitoki = Player("Hitoki", 1980)
    robin = Player("Robin", 800)
    nathan = Player("Nathan", 0)
    joe = Player("Joe", 1700)
    playerList = [hitoki,robin,nathan,joe]
    tournament = Tournament("test", "12/27/2024", "test", playerList)
    tournament.reportScore(hitoki,robin,3,2, hitoki)
    tournament.reportScore(hitoki,nathan,3,1, hitoki)
    tournament.reportScore(joe, hitoki, 3,1, joe)
    tournament.reportScore(joe, robin, 3, 0, joe)
    tournament.reportScore(joe, nathan, 3, 1, joe)
    tournament.reportScore(robin,nathan,3, 0,robin)

    
    
    matches = tournament.getMatches()
    for i in matches:
        print(matches[i])
        
        
    return tournament
    
if __name__ == "__main__":
    testerTournament()
    
