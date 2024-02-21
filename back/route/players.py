from flask import Blueprint
from flask import Response
from flask import request
import json
from flask_cors import cross_origin
import route.database as database

from pathlib import Path

"""
This file contains all needed features for player based features
"""


players = Blueprint('players', __name__)


def _load_players(file: "TextIOWrapper"):
    
    rows = []
    try:
        header = next(file)
        header = header.strip().split(",")
        if len(header) == 0:
            return rows
        
        player_name_col = header.index("Player Name")
        player_id_col = header.index("ID")
        player_ucitt_rating_col = header.index("Rating")
        
        for line in file:
            line = line.strip().split(",")
            row = {"player_name" : line[player_name_col], "player_ucitt_id": int(line[player_id_col]), "player_ucitt_rating": int(line[player_ucitt_rating_col])}
            rows.append(row)

    except Exception as ex:
        print(ex)
    
    return rows




@players.route("/player/getPlayers", methods=["GET", "POST"])
@cross_origin()
def getPlayers():

    """
    get all players

    """
    
    
    with database.get_db() as cur:
        
        x = cur.execute("SELECT * FROM Player")  

        results = x.fetchall()
        # print(results)
        response = results

    json_response = json.dumps(response)
    json_response = Response(json_response, content_type="application/json")
    return json_response




@players.route("/player/loadPlayers", methods=["GET", "POST"])
@cross_origin()
def loadPlayers():
    
    """
    Loads player from "back/route/src/players.csv"
    
    """
    response = {"Status" : "Failed"}
    print(Path(__file__).parent.resolve())
    
    
    with database.get_db() as cur:
        
        p = Path("/src/players.csv")
        p = Path(__file__).parent.joinpath(*p.parts[1:])
        f = open(p)
        rows = _load_players(f)
        
        rowCount = 0
        for player in rows:
            
            x = cur.execute(f"SELECT player_ucitt_id as id FROM Player WHERE player_ucitt_id = {player['player_ucitt_id']}")
            if(len(x.fetchall()) > 0):
                continue
            
            cur.execute(f"""INSERT INTO Player(player_ucitt_id,player_ucitt_rating,player_name)
                            VALUES({player["player_ucitt_id"]},{player["player_ucitt_rating"]},"{player["player_name"]}")
                        """)  
            rowCount+=1
        
        response = {"Status" : "Success", "Inserted": rowCount}
    
    
    json_response = json.dumps(response)
    json_response = Response(json_response, content_type="application/json")
    return json_response
    
        

    
    

