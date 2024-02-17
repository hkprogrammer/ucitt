# from tournament import Tournament
# from tournament import testerTournament
from tournament import Player



class RatingProcessor:
    
    
    POINT_SPREAD = [[238,0,50], [213, 1, 45], [188, 1, 40], [163, 2, 35], [138, 2, 30], [113, 3, 25], [88, 4, 20], [63, 5, 16], [38, 6, 13], [13, 7, 10], [0, 8, 8]]

    
    def __init__(self, tournament: "Tournament"):
        self.tournament = tournament
        self.POINT_SPREAD = RatingProcessor.POINT_SPREAD
        self.matches = self.tournament.getMatches()
        
        # self.mathematicalMedian = 
        
        #mathematical median of initial ratings:
        listOfRatings = []
        for player in self.tournament.getListOfPlayers():
            listOfRatings.append(player.getRating())
        listOfRatings = sorted(listOfRatings)
        
        self.mathematicalMedian = listOfRatings[len(listOfRatings)//2]
        
        
        # self.initialRatings = {player.getID(): player.getRating() for player in self.tournament.getListOfPlayers()}
        # print(self.initialRatings)
        
        
    def calculate(self):
        self.pass1()
        self.pass2()
        self.pass3()
        self.pass4()
        print("Finished calculating!")
        

        return 0
    
    def pass1(self):
        
        
        playerGains = {}
        for player in self.tournament.getListOfPlayers():
            if player.getRating() == 0:
                continue
            
            pointsGained = self.pointExchangeTable(player, self.matches[player.getID()])
    
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
            if abs(player.getPass1Gained()) < 50:
                #FIXME CHANGE 0
                player.pass2Adjustment = player.getRating()
            
            elif abs(50 <= player.getPass1Gained()) <= 74:
                #FIXME
                player.pass2Adjustment = player.getPass1Final()
                
            else:
                
                
                
                playerWL = self.matchWL(player, self.matches[player.getID()])
                
                if len(playerWL["matchesWon"]) >=1 and len(playerWL["matchesLost"]) >=1:
                    bestWin = self.bestWin(player, playerWL["matchesWon"])
                    worstLost = self.worstLost(player, playerWL["matchesLost"])

                    p2Adjustment = (player.getPass1Final() + (bestWin+worstLost)//2) //2
                    player.setPass2Adjustment(p2Adjustment)
                
                elif len(playerWL['matchesLost']) == 0 and len(playerWL["matchesWon"]) >= 1:
                    oppoRating = []
                    for match in self.matches[player.getID()]:
                        opponent = match.getOpponent(player)
                        oppoRating.append(opponent.getRating())
                    
                    p2Adjustment = oppoRating[len(oppoRating)//2]
                    player.setPass2Adjustment(p2Adjustment)
                    
                else:
                    player.setPass2Adjustment(player.getRating())
                    
            # print(player, player.getRating(), player.getPass1Final(), player.getPass2Adjustment())

                
                
            
        for player in unratedPlayers:
            
            listOfOpponents = self.getAllOpponents(player, self.matches[player.getID()])
            
            if not listOfOpponents:
                continue
            
            
            if self.allUnrated(listOfOpponents):
                p2Adjustment = 1200
                player.setPass2Adjustment(p2Adjustment)
                
                continue
            
            playerWL = self.matchWL(player, self.matches[player.getID()])
                
            
            if len(playerWL["matchesWon"]) >= 1 and len(playerWL["matchesLost"]) >= 1:
                # assuming at least 1 player has a rating because of the prior if statment
                
                
                
                bestWin = self.bestWinPlayer(player, playerWL["matchesWon"])
                worstLost = self.worstLostPlayer(player, playerWL["matchesLost"])
            
                
                average = (bestWin.getPass2Adjustment() + worstLost.getPass2Adjustment()) // 2
                player.setPass2Adjustment(average)
                
                
                continue
            
            if(len(playerWL["matchesWon"]) >=1 and len(playerWL["matchesLost"]) == 0):
                #assuming at least 1 player has the rating because of the two prior statements
                # opponentList = []
                
                opponentList = self.getAllOpponents(player, self.matches[player.getID()])
                
                
                
                intermediate = 0
                for opponent in opponentList:
                    opponentWL = self.matchWL(opponent, self.matches[opponent.getID()])
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
                
                
                # opponentList = self.getAllOpponents(player, self.matches[player.getID()])
                worstLost = self.worstLost(player, [match for match in playerWL["matchesLost"] if match.getOpponent(player).getRating()  != 0 ])
                worstLost = max(0, worstLost)
                intermediate = 0
                for opponent in self.tournament.getListOfPlayers():
                    
                    
                    opponentPass2 = opponent.getPass2Adjustment()
                    
                    
                    diff = abs(worstLost - opponentPass2)
                    # print(diff)
                    if 1<=diff<=50:
                        intermediate += 10
                        
                    if 51<=diff<=100:
                        intermediate += 5
                        
                    if 101<=diff<=150:
                        intermediate += 1
                        
                    
                
                
               
                pass2Adjust = worstLost + intermediate
                player.setPass2Adjustment(pass2Adjust)
                
                
                # print(player, pass2Adjust, intermediate)
                # 1/0
                
            
            
            # print(player, player.getRating(), player.getPass1Final(), player.getPass2Adjustment())
          
    def pass3(self):
        
        
        
        for player in self.tournament.getListOfPlayers():
            
            
            playerWL = self.matchWL(player, self.matches[player.getID()])
            if player.getRating() == 0 and (playerWL["matchesWon"] == 0 or playerWL["matchesLost"] == 0):
                
                player.setPass3Part2Adjustment(player.getPass2Adjustment())
                    
            else:
                
                matches = self.matches[player.getID()]
                pointsGained = self.pointExchangeTable(player, matches, usingPass2=True)
                player.setPass3Part1Adjustment(pointsGained)
                player.setPass3Gained(pointsGained)
                
                if pointsGained < 50:
                    player.setPass3Part2Adjustment(player.getPass2Adjustment())
                    # continue
                
                if 50 <= pointsGained <= 74:
                    player.setPass3Part2Adjustment(player.getPass2Adjustment() + pointsGained)
                    
                    
                if pointsGained >=75:
                    
                    
                    if len(playerWL["matchesWon"]) >= 1 and len(playerWL["matchesLost"]) >= 1:
                        bestWin = self.bestWin(player, playerWL["matchesWon"], usingPass2=True)
                        worstLost = self.worstLost(player, playerWL["matchesLost"], usingPass2=True)
                        
                        bestWorstAvg = (bestWin + worstLost) //2
                        avg = (bestWorstAvg + player.getPass2Adjustment() + pointsGained)//2
                        player.setPass3Part2Adjustment(avg)
                        

                    #mathematical median of all opponents rating
                    
                    if len(playerWL["matchesWon"]) >= 1 and len(playerWL["matchesLost"]) == 0:
                        player.setPass3Part2Adjustment(self.mathematicalMedian)
                        
                
                player.setPass3Part2Adjustment(max(player.getRating(), player.getPass3Part2Adjustment()))
            
            
            specialValue = self.tournament.specialRule(player.getOriginalRating())
            print(specialValue)
            if  specialValue != -1:
                player.setPass3Part2Adjustment(specialValue)
                print("SETTING SPECIAL VALUE " + str(specialValue) )
                
            
            # self.special = []
            # #special cases:
            # if player in self.special:
            #     #DO SOMETHING
            #     pass
            
            
                
    def pass4(self):
        
        
        for player in self.tournament.getListOfPlayers():
            matches = self.matches[player.getID()]
            player.setNewRating(player.getPass3Part2Adjustment())
            pointsGained = self.pointExchangeTable(player, matches)
            player.setNewRating(player.getRating() + pointsGained)
            
        
            
        
        
        
    
    
    
    def pointExchangeTable(self,player,matches, usingPass2=False) -> int:

        pointsGained = 0
        # print(player)
        for match in matches:
            expectations = self.expectWinLost(player,match, usingPass2=usingPass2)
            # print(expectations)
            pointsGained += expectations[1]
                
       
        return pointsGained
        
          
          
      
    
    def getAllOpponents(self, player, matches):
        if len(matches) == 0:
            return None
        
        opponents = []
        for match in matches:
            opponents.append(match.getOpponent(player))
        
        return opponents
        

            
            
    
    
            
            
        
        
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
    
    
    def bestWin(self,player,matches,usingPass2=False):
        
        
        return self.bestWinPlayer(player, matches, usingPass2).getRating()
    
    def bestWinPlayer(self,player,matches, usingPass2=False) ->Player:
        bestWin = Player("PLACEHOLDER", float("-inf"))
        
        for match in matches:
            if match.getWinner() == player:
                opponent = match.getOpponent(player)
                opponentRating = opponent.getRating() if not usingPass2 else opponent.getPass2Adjustment()
                if opponentRating > bestWin.getRating() if not usingPass2 else opponent.getPass2Adjustment():
                    bestWin = opponent
        
        return bestWin
    
    
    def worstLostPlayer(self, player, matches, usingPass2=False) -> Player:
        worstLost = Player("PLACEHOLDER", float("inf"))
        for match in matches:
            if match.getWinner() != player:
                opponent = match.getOpponent(player)
                opponentRating = opponent.getRating() if not usingPass2 else opponent.getPass2Adjustment()
                if opponentRating < worstLost.getRating() if not usingPass2 else opponent.getPass2Adjustment():
                    worstLost = opponent
        
        return worstLost

    def worstLost(self,player,matches,usingPass2=False) :
        return self.worstLostPlayer(player, matches, usingPass2).getRating()
        
        
    
    def expectWinLost(self,player,match, usingPass2=False):
        player1 = match.getPlayer1()
        player2 = match.getPlayer2()
        difference = ["UNRATED", 0]
        
        
        
        if not usingPass2 and self.isUnrated(player1) or self.isUnrated(player2):
            #skip if unrated
            return difference
            
        
        #compensate for pass3
        
        
        if usingPass2:
            pointDifference = abs(player1.getPass2Adjustment() - player2.getPass2Adjustment())
        else: 
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

