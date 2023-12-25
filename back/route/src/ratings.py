


"""
    Point Spread 	Expected Result 	Upset Result
0 - 12 	8 	8
13 - 37 	7 	10
38 - 62 	6 	13
63 - 87 	5 	16
88 - 112 	4 	20
113 - 137 	3 	25
138 - 162 	2 	30
163 - 187 	2 	35
188 - 212 	1 	40
213 - 237 	1 	45
238 and up 	0 	50
"""

POINT_SPREAD = [[238,0,50], [213, 1, 45], [188, 1, 40], [163, 2, 35], [138, 2, 30], [113, 3, 25], [88, 4, 20], [63, 5, 16], [38, 6, 13], [13, 7, 10], [0, 8, 8]]

class Rating:
    def __init__(self,playerName, playerRating, matches):
        """

        Args:
            playerName (_type_): _description_
            playerRating (_type_): _description_
            matches (list[list]): [[playerWon: str, player1Rating: int, player2Rating: int]] assume that player1 is winner
        """
        self.playerName = playerName
        self.playerRating = playerRating
        self.matches = matches
        self.pointSpreads = POINT_SPREAD
        
    def calculate(self):
        p1 = self.pass1()
        
    
    
    def pass1(self):
        pointsGained = 0
        if self.playerRating == 0:
            return pointsGained
        
        for i in self.matches:
            if 0 in i:
                #ignores unrated players
                continue
            
            pointsGained += self.expectWinLoss(*i)[1] #unpacks i[0], i[1], i[2]
            print(self.expectWinLoss(*i))

        return pointsGained

            
            
            
        
        
    def expectWinLoss(self, playerWon: str, player1:int, player2:int,) -> ["EXPECTED" or "UPSET", int]:
        """
        Calculates points gain or loss by 

        Raises:
            Exception: _description_

        Returns:
            _type_: _description_
        """


        pointDiff = abs(player1-player2)
        for i in self.pointSpreads:
            if pointDiff >= i[0]:
                
                if playerWon == self.playerName and player1>=player2:
                    return ["EXPECTED", i[1]]
                
                if playerWon != self.playerName and player1>= player2:
                    return ["EXPECTED", -i[1]]
                
                if playerWon == self.playerName and player1<player2:
                    return ["UPSET", i[2]]
                
                if playerWon != self.playerName and player1<player2:
                    return ["UPSET", i[2]]
                             
        raise Exception(f"unknown point spread of {pointDiff} of p1: {player1}, p2: {player2}")
                
        
        
if __name__ == "__main__":
    # # s = []
    # # for _ in range(10):
    # #     s.append([int(i) for i in input().split(" ")])
    # # print(s)
    # s = [[0, 8, 8], [13, 7, 10], [38, 6, 13], [63, 5, 16], [88, 4, 20], [113, 3, 25], [138, 2, 30], [163, 2, 35], [188, 1, 40], [213, 1, 45]]
    # print(list(reversed(s)))
    
    playerName = "Hitoki"
    rating = 1890
    matches = [["Hitoki", 1890, 1930], ["NotHitoki", 1950, 1890], ["Hitoki", 1890, 2400]]
    rating = Rating(playerName,rating,matches)
    print(rating.pass1())
    pass