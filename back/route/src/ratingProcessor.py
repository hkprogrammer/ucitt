from tournament import Tournament
from tournament import testerTournament
from tournament import Player



class RatingProcessor:
    
    
    POINT_SPREAD = [[238,0,50], [213, 1, 45], [188, 1, 40], [163, 2, 35], [138, 2, 30], [113, 3, 25], [88, 4, 20], [63, 5, 16], [38, 6, 13], [13, 7, 10], [0, 8, 8]]

    
    def __init__(self, tournament: Tournament):
        self.tournament = tournament
        self.POINT_SPREAD = RatingProcessor.POINT_SPREAD
        self.matches = self.tournament.getMatches()
        
        # self.initialRatings = {player.getName(): player.getRating() for player in self.tournament.getListOfPlayers()}
        # print(self.initialRatings)
        
        
    def calculate(self):
        p1 = self.pass1()
        p2 = self.pass2(p1)
        p3 = self.pass3(p1,p2)
        p4 = self.pass4(p1,p2,p3)
        return p4
    
    def pass1(self):
        
        
        
        for player in self.tournament.listOfPlayers:
            if player.getRating() == 0:
                continue
            
            
            matches = self.matches[player.getName()]
            pointsGained = 0
            print(player)
            for match in matches:
                expectations = self.expectWinLost(player,match)
                print(expectations)
                pointsGained += expectations[1]
                 
            player.setPass1Gained(pointsGained)
            player.setPass1Final(player.getRating() + pointsGained)
            
        return pointsGained
    
    def expectWinLost(self,player,match):
        player1 = match.getPlayer1()
        player2 = match.getPlayer2()
        difference = ["UNRATED", 0]
        
        if self.isUnrated(player1) or self.isUnrated(player2):
            #skip if unrated
            return difference
            
        pointDifference = abs(player1.getRating() - player2.getRating())
        
        
        
        for pointSpreads in self.POINT_SPREAD:
            if pointDifference < pointSpreads[0]:
                continue
            
            expectedPoints = pointSpreads[1]
            upsetPoints = pointSpreads[2]
                
                
        
            opponent = player1 if player1 != player else player2
            
            
            
            
            
            if player.getRating() == opponent.getRating():
                difference[0] = "EXPECTED"
                difference[1] = expectedPoints if player == match.getWinner() else -expectedPoints
                
            
            elif player.getRating() > opponent.getRating():
                difference[0] = "EXPECTED" if player == match.getWinner() else "UPSET"
                difference[1] = expectedPoints if player == match.getWinner() else -upsetPoints
                
                
            elif player.getRating() < opponent.getRating():
                difference[0] = "UPSET" if player == match.getWinner() else "EXPECTED"
                difference[1] = upsetPoints if player == match.getWinner() else -expectedPoints
                
            
            # difference[1] = difference[1] if player == match.getWinner() else -difference[1]
            
            break
        
        return difference

        
    
    def isUnrated(self, player: Player):
        if player.getRating() == 0:
            return True
        return False
    
    
    def pass2(self,p1):
        pass
    
    def pass3(self,p1,p2):
        pass
    
    def pass4(self,p1,p2,p3):
        pass
    
    # def expectWinLoss(self, match: ) -> ["EXPECTED" or "UPSET", int]:
    #     """
    #     Calculates points gain or loss by 

    #     Raises:
    #         Exception: _description_

    #     Returns:
    #         _type_: _description_
    #     """


    #     pointDiff = abs(player1-player2)
    #     for i in self.pointSpreads:
    #         if pointDiff >= i[0]:
                
    #             if playerWon == self.playerName and player1>=player2:
    #                 return ["EXPECTED", i[1]]
                
    #             if playerWon != self.playerName and player1>= player2:
    #                 return ["EXPECTED", -i[1]]
                
    #             if playerWon == self.playerName and player1<player2:
    #                 return ["UPSET", i[2]]
                
    #             if playerWon != self.playerName and player1<player2:
    #                 return ["UPSET", i[2]]
                             
    #     raise Exception(f"unknown point spread of {pointDiff} of p1: {player1}, p2: {player2}")


if __name__ == "__main__":
    
    
    tournament = testerTournament()
    rp = RatingProcessor(tournament)
    print(rp.pass1())