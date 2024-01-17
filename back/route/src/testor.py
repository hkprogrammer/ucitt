from tournament import *
from ratingProcessor import *


def sampleImportTournament():
    
    t = open("sample1.csv")
    players = open("samplePlayers.csv")
    
    
    listOfPlayers = []
    next(players)
    for line in players:
        l = line.strip().split(",")
        player = Player(l[0], int(l[2]), l[1])
        listOfPlayers.append(player)
        
        
    
    
    tournament = Tournament("UCITT December Open", "", "", listOfPlayers)
    tournament.importFile(t)
    
    
    t.close()
    players.close()
    
    rp = RatingProcessor(tournament)
    print(rp.pass1())
    print()
    print(rp.pass2())    
    
    
    
    for player in listOfPlayers:
        print(f"Player: {player.getName()} | oldRating: {player.getRating()} | newRating: {player.getPass2Adjustment()} | Change: {player.getPass2Adjustment() - player.getRating()}")    
        
    pass

if __name__ == "__main__":
    sampleImportTournament()