const express = require('express');
const { Kafka } = require('kafkajs');
var bodyParser = require('body-parser');
const { json } = require('body-parser');

const app = express();
app.use(bodyParser.json())

const kafka = new Kafka({
  clientId: 'my-app1',
  brokers: ['kafka:9092']
})
const producer = kafka.producer()


app.get("/",(req,res)=>{
  res.send("<h1>PRODUCEEEEEEEEEEEEEEEEEEEEEEEEEEEEER</h1>")
})

app.post("/login", (req,res)=>{

  const b = JSON.stringify(req.body)
  console.log(b)
  const run = async () => {
    const producer = kafka.producer()
    const admin = kafka.admin()
    await admin.connect()
    await producer.connect()
    await admin.createTopics({
      waitForLeaders: true,
      topics: [
        { topic: 'test-topic',
        replicationFactor: 1
        },
      ],
    })
    await producer.connect()
    console.log("Dentro del connect del producer");
    await producer.send({
      //falta hacer que escriba en el json
      topic: 'test-topic',
      messages: [
        { value: b },
      ],
    })
  }
  run().catch(console.error)
})


app.listen(3000, ()=>{
  console.log("server in port 3000 PRODUCER");
})