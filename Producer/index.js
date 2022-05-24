const express = require('express');
const { Kafka } = require('kafkajs');
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka1:9092', 'kafka2:9092']
})
const producer = kafka.producer()


app.get("/",(req,res)=>{
  res.send("<h1>PRODUCEEEEEEEEEEEEEEEEEEEEEEEEEEEEER</h1>")
})

app.post("/login", (req,res)=>{
  const b = req.body;
  const user =JSON.stringify(b.user);
  const pass =JSON.stringify(b.pass);
  console.log(user);
  console.log(pass);
  const run = async () => {
    await producer.connect()
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    })
  }
}) 

app.listen(3000, ()=>{
  console.log("server in port 3000 PRODUCER");
})