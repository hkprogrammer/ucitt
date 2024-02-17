from flask import Blueprint
from flask import Response
from flask import request
import json

from flask_cors import cross_origin
import route.database as database
"""
This file contains all needed features for the league feature
"""


league = Blueprint('league', __name__)




def results_to_text(results: list[dict]):
    
    
    if len(results) == 0:
        return ""
    
    # keys = results[0].keys()
    keys = ["match_id","player_a","score_a","score_b","player_b"]
    formatted = ",".join(keys) + "\n"
    
    for result in results:
        f_line = []
        for key in keys:
            f_line.append(result[key])
        formatted += ",".join(str(i) for i in f_line) + "\n"
    return formatted
    
        
    
    




@league.route("/league/getResults", methods=["GET", "POST"])
@cross_origin()
def getResults():
    
    """
    

    """
    
    # results = [
    #     {"match_id": 1,"player_a": "Hitoki", "score_a": "3", "score_b": "0", "player_b": "Robin"},
    #     {"match_id": 2,"player_a": "Hitoki", "score_a": "3", "score_b": "0", "player_b": "Nathan"}
    # ]
    
    
    with database.get_db() as cur:
        
        x = cur.execute("SELECT * FROM league_results")  

        results = x.fetchall()
        # print(results)
        response = results

    json_response = json.dumps(response)
    json_response = Response(json_response, content_type="application/json")
    return json_response



@league.route("/league/setResults", methods=["POST"])
@cross_origin()
def setResults():
    
    """
    sample test, http://localhost:5000/

    """
    
    
    req = request.data
    req = json.loads(req)
    
    response = None
    
    try:
        player_a = req["player_a"]
        player_b = req["player_b"]
        score_a = int(req["score_a"])
        score_b = int(req["score_b"])


        with database.get_db() as cur:
            
            # x = cur.execute(f"INSERT INTO league_results(player_a,player_b,score_a,score_b) VALUES({player_a},{player_b})")
            
            
            c = cur.execute("SELECT match_id FROM league_results ORDER BY match_id DESC LIMIT 1")
            match_id = c.fetchall()
            match_id = int(match_id[0]["match_id"]) + 1
            
            
            x = cur.execute(f"""
                            INSERT INTO league_results(match_id,player_a,player_b,score_a,score_b)
                            VALUES({match_id},'{player_a}','{player_b}',{score_a},{score_b});
                            """)  

            results = {"Status": "Success"}
            response = results
    except Exception as ex:
        response = {"Status": "Error", "Code" : str(ex)}

    json_response = json.dumps(response)
    json_response = Response(json_response, content_type="application/json")
    return json_response


@league.route("/league/exportResults", methods=["GET"])
@cross_origin()
def exportResults():
    
    """
    

    """
    
    # results = [
    #     {"match_id": 1,"player_a": "Hitoki", "score_a": "3", "score_b": "0", "player_b": "Robin"},
    #     {"match_id": 2,"player_a": "Hitoki", "score_a": "3", "score_b": "0", "player_b": "Nathan"}
    # ]
    
    
    
    try:
    
        with database.get_db() as cur:
            
            x = cur.execute("SELECT * FROM league_results")  

            results = x.fetchall()
            
            
            txt = results_to_text(results)
            
            # print(results)
            response = txt
    except Exception as ex:
        print(ex)
        response = {"Status": "Error", "Code": str(ex)}

    # json_response = json.dumps(response)
    json_response = response # returning text file
    json_response = Response(json_response, content_type="text/plain")
    return json_response


