from flask import Flask, Response
from kafka import KafkaConsumer

consumer = KafkaConsumer('test')

app = Flask(__name__)

def kafka_stream():
    for msg in consumer:
        yield('{}'.format(msg.value))

@app.route('/')
def index():
    return Response(kafka_stream(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(host='0.0.0.0')
