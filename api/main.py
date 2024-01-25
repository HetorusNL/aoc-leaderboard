from flask import Flask, jsonify
import json
import os
import requests

session = os.getenv("session")
assert session is not None

api = Flask(__name__)

welcome_message = """
<h1>Welcome to the AoC Leaderboard API!</h1>
<br />
The API exposes the endpoint: `/&lt;edition&gt;/&lt;leaderboard&gt;`
"""

cache: dict[str, dict] = {}


@api.route("/")
def root():
    return welcome_message


@api.route("/<string:edition>/<string:leaderboard>")
def leaderboard(edition: str, leaderboard: str):
    if cache.get(f"{edition}/{leaderboard}"):
        print(f"fetching [{edition}/{leaderboard}] from cache")
        data = cache[f"{edition}/{leaderboard}"]
    else:
        print(f"fetching [{edition}/{leaderboard}] from AoC API")
        leaderboard_url = f"https://adventofcode.com/{edition}/leaderboard/private/view/{leaderboard}.json"
        result = requests.get(leaderboard_url, cookies={"session": session})
        try:
            data = json.loads(result.content.decode("utf-8"))
            cache[f"{edition}/{leaderboard}"] = data
        except:
            data = None
    return jsonify({"edition": edition, "leaderboard": leaderboard, "data": data})


@api.route("/clear-cache")
def clear_cache():
    print("clearing cache...")
    cache.clear()
    print("cache cleared!")
    return jsonify({"result": "success"})


if __name__ == "__main__":
    # run the API as a blocking call
    api.run(host="0.0.0.0")
