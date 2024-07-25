from flask import Flask, jsonify
import json
import os
import requests

from cache import Cache

session: str = os.getenv("session", "no-session-key-configured")

api = Flask(__name__)

welcome_message = """
<h1>Welcome to the AoC Leaderboard API!</h1>
<br />
The API exposes the endpoint: `/&lt;edition&gt;/&lt;leaderboard&gt;`
"""

cache: Cache = Cache()


@api.route("/")
def root():
    return welcome_message


@api.route("/<string:edition>/<string:leaderboard>")
def leaderboard(edition: str, leaderboard: str):
    cache_key = f"{edition}/{leaderboard}"
    if data := cache.get(cache_key):
        print(f"fetching [{cache_key}] from cache")
    else:
        print(f"fetching [{cache_key}] from AoC API")
        leaderboard_url = f"https://adventofcode.com/{edition}/leaderboard/private/view/{leaderboard}.json"
        result = requests.get(leaderboard_url, cookies={"session": session})
        try:
            data = json.loads(result.content.decode("utf-8"))
            cache.add(cache_key, data)
        except:
            data = None
    return jsonify({"edition": edition, "leaderboard": leaderboard, "data": data})


@api.route("/clear-cache")
def clear_cache():
    print("clearing cache...")
    cache.clear()
    print("cache cleared!")
    return jsonify({"result": "success"})


@api.route("/admin/session/get")
def session_token_get():
    print(f"returning session token {session}")
    return jsonify({"session": session})


@api.route("/admin/session/set/<string:token>")
def session_token(token: str):
    print(f"setting session token to {token}")
    global session
    session = token  # store the token in the global session variable
    return jsonify({"result": "success"})


if __name__ == "__main__":
    # run the API as a blocking call
    api.run(host="0.0.0.0")
