from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Lets the React app at localhost:5173 call this API

@app.get("/api/health")
def health_check():
    return jsonify({"status": "ok", "message": "Flask API is running"})

@app.post("/api/analyze")
def analyze():
    data = request.get_json(silent=True) or {}
    test_input = data.get("testInput", "")

    # Temporary demo response: replace with real evaluation logic later.
    return jsonify({
        "overallRisk": "Medium",
        "inputReceived": test_input,
        "languages": [
            {"name": "American English", "score": 96, "risk": "Low"},
            {"name": "Japanese", "score": 81, "risk": "High"},
            {"name": "Russian", "score": 88, "risk": "Medium"}
        ],
        "flaggedFailures": [
            {
                "language": "Japanese",
                "failureType": "Negation lost",
                "severity": "High"
            }
        ]
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)