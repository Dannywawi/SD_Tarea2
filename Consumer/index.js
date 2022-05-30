const express = require('express');

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app2',
  brokers: ['kafka:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })

const app = express();

app.get("/", (req, res) =>{
    res.send("<h1>Sistemas distribuidos, parte de Login</h1>");
})

app.get("/blocked", (req, res) =>{
  //falta hacer que lea el json
  const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        res.send(message.value.toString())
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
      },
    })
  }
  run().catch(console.error)
})

app.listen(5000, () => {
    console.log("Started server on 5000 CONSUMER");
  });

  const run = async () => {
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {

        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
      },
    })
  }
  
  
