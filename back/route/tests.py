from flask import Blueprint
from flask import Response
from flask import request
from flask_cors import CORS, cross_origin
import json





"""

This file contains tests

"""


tests = Blueprint('tests', __name__)


"""

    Shown below are some test routes for GET, POST and bad requests.
    Assume all request variables are stored in a dictionary format. 
    When needed to use the key value pair make sure to int, str, or bool as needed
    All actual routes should be written in the routes.py file instead of here to avoid mess
    
    
"""

@tests.route("/", methods=["GET", "POST"])
@cross_origin()
def hello_world():
    """
    Test function for connectivity

    Returns:
        json_response: Response object with res value
    """
    
    res = {
        "message" : "Hello World"
        }
    
    json_response = json.dumps(res)
    json_response = Response(json_response, status=200, content_type="application/json")
    return json_response


@tests.route("/test/post", methods=["POST"])
def postTest():
    """
    Test functionality for post method
    This responds back any incoming requests
    


    """
    
    req = request.form
    print(req)
    res = req
    
    json_response = json.dumps(res)
    json_response = Response(json_response,status=200, content_type="application/json")
    
    return json_response




@tests.route("/test/get", methods=["GET"])
def getTest():
    """
    Test functionality for get requests
    This also responses all variables from reqeust

    """
    
    req = request.args
    print(req)
    res = req
    
    json_response = json.dumps(res)
    json_response = Response(json_response,status=200, content_type="application/json")
    
    return json_response




@tests.route("/test/badRequest", methods=["GET","POST","PUT","UPDATE","DELETE"])
def badRequest():
    
    """
    Bad Request example. status can be set to any regular HTTP status values. Content headers can be set as well
    
    """
    
    res = {
        "Bad Request": "BAD"
        }
    
    json_response = json.dumps(res)
    json_response = Response(json_response,status=404, content_type="application/json")
    
    return json_response


