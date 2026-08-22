import os

os.environ.setdefault("TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD", "1")

from flask import Flask, jsonify, request
from flask_cors import CORS
from multivalue import Dialects

app = Flask(__name__)
CORS(app)

# Initialize dialects once at startup
indian_dialect = Dialects.IndianDialect()
singlish_dialect = Dialects.ColloquialSingaporeDialect()

@app.get("/api/health")
def health_check():
    return jsonify({"status": "ok", "message": "Flask API is running"})

@app.post("/api/analyze")
def analyze():
    data = request.get_json(silent=True) or {}
    text = data.get("testInput", "")

    if not text:
        return jsonify({"error": "No input provided"}), 400

    # Transform text into dialect variants
    indian_transformed = indian_dialect.transform(text)
    singlish_transformed = singlish_dialect.transform(text)

    indian_rules = indian_dialect.executed_rules
    singlish_rules = singlish_dialect.executed_rules

    return jsonify({
        "originalText": text,
        "dialects": [
            {
                "name": "American English",
                "text": text,
                "rulesApplied": [],
                "risk": "Low"
            },
            {
                "name": "Indian English",
                "text": indian_transformed,
                "rulesApplied": indian_rules,
                "risk": "High" if indian_rules else "Low"
            },
            {
                "name": "Singapore English",
                "text": singlish_transformed,
                "rulesApplied": singlish_rules,
                "risk": "High" if singlish_rules else "Low"
            }
        ]
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)