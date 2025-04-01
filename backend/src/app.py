# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json



app = Flask(__name__)
CORS(app)

@app.route('/api/hello', methods=['POST'])
def hello():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
        input_str = json.dumps(data)
        
        print("Input JSON string:", input_str)
        
        # Run the C++ binary, passing the JSON data via standard input
        result = subprocess.run(["../build/taxCalculator"], input=input_str, capture_output=True, text=True)
        
        print("C++ binary output:", result.stdout)
        print("C++ binary error output:", result.stderr)
        # Parse the C++ output (which is JSON) and return it as the response
                
        output_data = json.loads(result.stdout)
        
        print("Parsed JSON output:", output_data)
              
        # return jsonify(output_data)

        # Return a JSON response with hello message
        
        return jsonify({
            "message": "Server is working fine!",
            "alert": "This is a hello alert from the server!"
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Failed to send greeting",
            "details": str(e)
        }), 500



@app.route('/api/calculate', methods=['POST'])
def calculate():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        
        # Convert the JSON data (formData) to a string
        input_str = json.dumps(data)
        
        print("Input JSON string:", input_str)
       
        # Run the C++ binary, passing the JSON data via standard input
        result = subprocess.run(["../build/taxCalculator"], input=input_str, capture_output=True, text=True)
        
        print("C++ binary output:", result.stdout)
        print("C++ binary error output:", result.stderr)
        
        if result.returncode != 0:
            return jsonify({
                "error": "C++ binary execution failed",
                "details": result.stderr
            }), 500
        
        # Parse the C++ output (which is JSON) and return it as the response
        output_data = json.loads(result.stdout)
        
        print("Parsed JSON output:", output_data)
            
        return jsonify(output_data)
        
    except Exception as e:
        return jsonify({
            "error": "Internal Server Error in python",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=5000)
