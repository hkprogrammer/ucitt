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
        p2 = self.pass2()

        return 0
    
    def pass1(self):
        
        
        playerGains = {}
        for player in self.tournament.getListOfPlayers():
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
            playerGains[player] = pointsGained
        return playerGains
    
    def pass2(self):

        unratedPlayers = []
        
        for player in self.tournament.getListOfPlayers():
            if self.isUnrated(player):
                unratedPlayers.append(player)
                continue
            
            
            
            #rated players case 1 2 3
            if player.getPass1Gained() < 50:
                #FIXME CHANGE 0
                player.pass2Adjustment = player.getRating()
            
            elif 50 <= player.getPass1Gained() <= 74:
                #FIXME
                player.pass2Adjustment = player.getPass1Final()
                
            else:
                
                
                
                playerWL = self.matchWL(player, self.matches[player.getName()])
                
                if len(playerWL["matchesWon"]) >=1 and len(playerWL["matchesLost"]) >=1:
                    bestWin = self.bestWin(player, playerWL["matchesWon"])
                    worstLost = self.worstLost(player, playerWL["matchesLost"])

                    p2Adjustment = (player.getPass1Final() + (bestWin+worstLost)//2) //2
                    player.setPass2Adjustment(p2Adjustment)
                
                elif len(playerWL['matchesLost']) == 0 and len(playerWL["matchesWon"]) >= 1:
                    oppoRating = []
                    for match in self.matches[player.getName()]:
                        opponent = match.getOpponent(player)
                        oppoRating.append(opponent.getRating())
                    
                    p2Adjustment = oppoRating[len(oppoRating)//2]
                    player.setPass2Adjustment(p2Adjustment)
                    
                else:
                    player.setPass2Adjustment(player.getRating())
                    
            print(player, player.getRating(), player.getPass1Final(), player.getPass2Adjustment())

                
                
            
        for player in unratedPlayers:
            
            listOfOpponents = self.getAllOpponents(player, self.matches[player.getName()])
            
            if self.allUnrated(listOfOpponents):
                p2Adjustment = 1200
                player.setPass2Adjustment(p2Adjustment)
                print(player, player.getRating(), player.getPass1Final(), player.getPass2Adjustment())
                continue
            
            playerWL = self.matchWL(player, self.matches[player.getName()])
            if len(playerWL["matchesWon"]) >= 1 and len(playerWL["matchesLost"]) >= 1:
                # assuming at least 1 player has a rating because of the prior if statment
                
                
                bestWin = self.bestWin(player, playerWL["matchesWon"])
                worstLost = self.worstLose(player, playerWL["matchesLost"])
            
                
                average = (bestWin.getPass2Adjustment() + worstLost.getPass2Adjustment()) // 2
                player.setPass2Adjustment(average)
                continue
            
            if(len(playerWL["matchesWon"]) >=1 and len(playerWL["matchesLost"]) == 0):
                #assuming at least 1 player has the rating because of the two prior statements
                # opponentList = []
                
                opponentList = self.getAllOpponents(player, self.matches[player.getName()])
                
                
                
                intermediate = 0
                for opponent in opponentList:
                    opponentWL = self.matchWL(opponent, self.matches[opponent.getName()])
                    bestWin = self.bestWin(opponent, opponentWL["matchesWon"])
                    worstLost = self.worstLost(opponent, opponentWL["matchesLost"])
                    
                    if not bestWin or not worstLost:
                        continue
                    
                    diff = abs(bestWin - worstLost)
                    if 1<=diff<=50:
                        intermediate += 10
                        
                    if 51<=diff<=100:
                        intermediate += 5
                        
                    if 101<=diff<=150:
                        intermediate += 1
                        
                currentBestWin = self.bestWin(player, playerWL["matchesWon"])
                pass2Adjust = currentBestWin + intermediate
                player.setPass2Adjustment(pass2Adjust)

            if(len(playerWL["matchesWon"]) == 0 and len(playerWL["matchesLost"]) >= 1):
                
                
                opponentList = self.getAllOpponents(player, self.matches[player.getName()])
                intermediate = 0
                for opponent in opponentList:
                    opponentWL = self.matchWL(opponent, self.matches[opponent.getName()])
                    bestWin = self.bestWin(opponent, opponentWL["matchesWon"])
                    worstLost = self.worstLost(opponent, opponentWL["matchesLost"])
                    
                    if bestWin == float("inf") or worstLost == float("inf"):
                        #that means this opponent has not lost or not won a single match
                        continue
                    
                
                    
                    diff = abs(bestWin - worstLost)
                    
                    
                    if 1<=diff<=50:
                        intermediate += 10
                        
                    if 51<=diff<=100:
                        intermediate += 5
                        
                    if 101<=diff<=150:
                        intermediate += 1
                        
                    
                
                
                currentWorstLost = self.worstLost(player, playerWL["matchesLost"])
                pass2Adjust = currentWorstLost + intermediate
                player.setPass2Adjustment(pass2Adjust)
                
            
            
            print(player, player.getRating(), player.getPass1Final(), player.getPass2Adjustment())
            
    
    def getAllOpponents(self, player, matches):
        if len(matches) == 0:
            return None
        
        opponents = []
        for match in matches:
            opponents.append(match.getOpponent(player))
        
        return opponents
        
            
            
    # def bestWin(self, player, matches):
        
    #     if len(matches) == 0:
    #         return None
        
    #     bestWin = matches[0].getOpponent(player)
    #     for match in matches[1:]:
    #         if match.getOpponent(player).getPass2Adjustment() > bestWin.getPass2Adjustment():
    #             bestWin = match.getOpponent(player)
    #     return bestWin
    
    
    # def worstLose(self, player, matches):
    #     if len(matches) == 0:
    #         return None
        
    #     worstLost = matches[0].getOpponent(player)
    #     for match in matches[1:]:
    #         if match.getOpponent(player).getPass2Adjustment() < worstLost.getPass2Adjustment():
    #             worstLost = match.getOpponent(player)
                
    #     return worstLost
            
            
            
    
    def pass3(self):
        
        for player in self.tournament.getListOfPlayers():
            pass
            
            
        
        
    def allUnrated(self, playerList: list[Player]) -> bool:
        
        for player in playerList:
            if player.getRating() != 0:
                return False
        return True
        
        
    
    def getListOfOpponents(self,player,matches):
        opponents = []
        for match in matches:
            opponents.append(match.getOpponent(player))
        return opponents
        
    def matchWL(self,player,matches):
        matchesWon = []
        matchesLost = []
        for match in matches:
            if player == match.getWinner():
                matchesWon.append(match)
            
            if player != match.getWinner() and player in match.getPlayers():
                matchesLost.append(match)
        return {"matchesWon": matchesWon, "matchesLost": matchesLost}
    
    
    def bestWin(self,player,matches)-> Player:
        
        
        bestWin = Player("PLACEHOLDER", float("-inf"))
        
        for match in matches:
            if match.getWinner() == player:
                opponent = match.getOpponent(player)
                opponentRating = opponent.getRating()
                if opponentRating > bestWin.getRating():
                    bestWin = opponent
        
        return bestWin.getRating()
    
    

    def worstLost(self,player,matches) -> Player:
        worstLost = Player("PLACEHOLDER", float("inf"))
        for match in matches:
            if match.getWinner() != player:
                opponent = match.getOpponent(player)
                opponentRating = opponent.getRating()
                if opponentRating < worstLost.getRating():
                    worstLost = opponent
        
        return worstLost.getRating()
        
        
    
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
    print()
    print(rp.pass2())