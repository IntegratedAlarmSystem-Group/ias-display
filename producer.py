from kafka import KafkaProducer
import time

producer = KafkaProducer(bootstrap_servers='localhost:9092')

for i in range(100):
    message = str(i)
    print(message)
    producer.send('test', message.encode())
    time.sleep(0.01)
