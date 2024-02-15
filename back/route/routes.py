from flask import Blueprint
from flask import Response
from flask import request
import json



"""

This file contains all the needed routes. Use routes variable instaed of app

"""


routes = Blueprint('routes', __name__)


@routes.route("/routeTest", methods=["GET", "POST"])
def routeTest():
    
    """
    sample test, http://localhost:5000/routeTest

    """
    
    
    json_response = json.dumps({"test":"success!"})
    json_response = Response(json_response, content_type="application/json")
    return json_response



