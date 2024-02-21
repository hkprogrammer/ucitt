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
        
        x = cur.execute("SELECT * FROM league_result")  

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
        score_a = req["score_a"]
        score_b = req["score_b"]
        
        player_a_name = player_a["player_name"]
        player_a_ucitt_id = player_a["player_ucitt_id"]
        
        player_b_name = player_b["player_name"]
        player_b_ucitt_id = player_b["player_ucitt_id"]
        
        player_a_score = score_a["value"]
        player_b_score = score_b["value"]
        

        with database.get_db() as cur:
            
            # x = cur.execute(f"INSERT INTO league_results(player_a,player_b,score_a,score_b) VALUES({player_a},{player_b})")
            
            
            c = cur.execute("SELECT match_id FROM league_result ORDER BY match_id DESC LIMIT 1")
            match_id = c.fetchall()
            
            if len(match_id) > 0:
                match_id = int(match_id[0]["match_id"]) + 1
            else:
                match_id = 1
            
            
            x = cur.execute(f"""
                            INSERT INTO league_result(match_id,player_a,player_b,score_a,score_b)
                            VALUES({match_id},'{player_a_name}','{player_b_name}',{player_a_score},{player_b_score});
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
            
            x = cur.execute("""SELECT lr.match_id as match_id, lr.score_a as score_a, lr.score_b as score_b, a.player_ucitt_id as player_a, b.player_ucitt_id as player_b
                            FROM league_result as lr 
                            LEFT JOIN player a ON lr.player_a = a.player_name 
                            LEFT JOIN player b ON lr.player_b = b.player_name
                            """)  
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



@league.route("/league/resetResults", methods=["GET"])
@cross_origin()
def resetResults():
    
    """
    Resets database for current league.
    

    """

    
    
    try:
    
        with database.get_db() as cur:
            
            x = cur.execute("DELETE FROM league_result WHERE match_id > 0;")  

            results = x.fetchall()
            
            
            
            # print(results)
            response = {"Status": "Success", "Message": results}
    except Exception as ex:
        print(ex)
        response = {"Status": "Error", "Code": str(ex)}

    json_response = json.dumps(response)
    json_response = Response(json_response, content_type="application/json")
    return json_response



@league.route("/league/deleteResult", methods=["DELETE"])
@cross_origin()
def deleteResult():
    
    """
    Delete rows from database for current league.
    

    """
    
    
    req = request.data
    req = json.loads(req)
    
    try:
    
        match_id = int(req['match_id'])
    

        with database.get_db() as cur:
            
            # print(f"DELETE FROM league_results WHERE match_id = {match_id};")
            x = cur.execute(f"DELETE FROM league_result WHERE match_id = {match_id};")  

            results = x.fetchall()
 
            # print(results)
            response = {"Status": "Success", "Message": results}
    except Exception as ex:
        print(ex)
        response = {"Status": "Error", "Code": str(ex)}

    json_response = json.dumps(response)
    json_response = Response(json_response, content_type="application/json")
    return json_response


