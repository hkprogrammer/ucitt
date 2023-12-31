from flask import Flask
import os
from pathlib import Path

from route.routes import routes as r1
from route.tests import tests as r2

ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))


# add blueprints as needed
app = Flask(__name__)
app.register_blueprint(r1)
app.register_blueprint(r2)







if __name__ == "__main__":
    
    
    # Attempt of using keypairs for HTTPS over TLS
    # keyPairs = (Path("keys/myKey.pem"), Path("keys/myKey.key"))
    
    app.run(debug=True)