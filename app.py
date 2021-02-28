import flask
from flask import Flask, request, Response, jsonify, abort
import json
import indeedTest as indeed
import monsterTest as monster


app = flask.Flask(__name__)


@app.route("/", methods=["GET","POST"])

def main():
    positionName = request.args.get('position')
    positionName = str(positionName)
    location = request.args.get('location')
    location = str(location)

    #arr1 = indeed.main2(positionName, location)
    arr2 = monster.main1(positionName, location)
    #for element in arr2:
    #    arr1.append(element)

    return Response(arr2)

if __name__ == '__main__':
    app.run(host='0.0.0.0')

# 1. in cmd, cd appsetup
# 2. in cmd, cd scripts
# 3. in cmd, activate
# 4. in cmd, cd ..
# 5. in cmd, cd ..
# 6. in cmd, pip install -r requirements.txt
# 7. in cmd, set FLASK_APP=Server.py
# 8. in cmd, flask run