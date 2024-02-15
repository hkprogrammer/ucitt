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


@league.route("/league/getResults", methods=["GET", "POST"])
@cross_origin()
def routeTest():
    
    """
    sample test, http://localhost:5000/

    """
    
    # results = [
    #     {"match_id": 1,"player_a": "Hitoki", "score_a": "3", "score_b": "0", "player_b": "Robin"},
    #     {"match_id": 2,"player_a": "Hitoki", "score_a": "3", "score_b": "0", "player_b": "Nathan"}
    # ]
    
    
    with database.get_db() as cur:
        
        x = cur.execute("SELECT * FROM league_results")  

        results = x.fetchall()
        print(results)
        response = results

    json_response = json.dumps(response)
    json_response = Response(json_response, content_type="application/json")
    return json_response



