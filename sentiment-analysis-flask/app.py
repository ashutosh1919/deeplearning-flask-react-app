from textblob import TextBlob
from flask_cors import CORS
# TextBlob(sentence).sentiment

from flask import Flask, jsonify, request
app = Flask(__name__)
CORS(app)

@app.route('/sentiment', methods=['POST'])
def predict_sentiment():
    data = request.get_json()
    sentence = data['sentence']
    sentiment = TextBlob(sentence).sentiment
    score = sum(sentiment)/len(sentiment)
    if score > 0.5:
        res = "Positive"
    else:
        res = "Negative"
    return jsonify({"sentiment": res})

@app.route('/', methods=['GET'])
def hello():
    return jsonify({"response":"This is Sentiment Application"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", threaded=True, port=5000)