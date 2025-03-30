# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json



app = Flask(__name__)
CORS(app)

@app.route('/api/calculate', methods=['POST'])
def calculate():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Convert the JSON data (formData) to a string
        input_str = json.dumps(data)
        
        # Run the C++ binary, passing the JSON data via standard input
        result = subprocess.run(["./main"], input=input_str, capture_output=True, text=True)
        if result.returncode != 0:
            return jsonify({
                "error": "C++ binary execution failed",
                "details": result.stderr
            }), 500
        
        # Parse the C++ output (which is JSON) and return it as the response
        output_data = json.loads(result.stdout)
        return jsonify(output_data)
        
    except Exception as e:
        return jsonify({
            "error": "Internal Server Error",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=5000)
