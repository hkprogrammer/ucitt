from tournament import *
from ratingProcessor import *


def sampleImportTournament():
    
    t = open("sample1.csv")
    t2 = open("sample2.csv")
    players = open("samplePlayers.csv")
    
    
    listOfPlayers = []
    next(players)
    for line in players:
        l = line.strip().split(",")
        player = Player(l[0], int(l[2]), l[1])
        listOfPlayers.append(player)
        
        
    
    
    tournament = Tournament("UCITT December Open", "", "", listOfPlayers)
    tournament2 = Tournament("UCITT 2024 Winter Tryouts", "", "", listOfPlayers)
    tournament.importFile(t)
    tournament2.importFile(t2)
    
    
    
    t.close()
    players.close()
    
    rp = RatingProcessor(tournament)
    rp.calculate()
    
    rp2 = RatingProcessor(tournament2)
    rp2.calculate()
    
    
    
    for player in listOfPlayers:
        print(f"Player: {player.getName()} | oldRating: {player.getOriginalRating()} | newRating: {player.getPass2Adjustment()} | Change: {player.getPass2Adjustment() - player.getOriginalRating()}")    
        
    pass

if __name__ == "__main__":
    sampleImportTournament()