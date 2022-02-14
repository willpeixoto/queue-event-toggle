'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const switcher = require("./event-handler");
const { uuid } = require('uuidv4');


//const sns = new AWS.SNS({ apiVersion: '2010-03-31' });
const queueThresholds = 10;
const arnHighPriorityQueue = 'arn:aws:sqs:us-east-2:774779793691:queue-prioritizationint-high-priority-queue.fifo'
const arnLowPriority = 'arn:aws:sqs:us-east-2:774779793691:queue-prioritizationint-no-priority-queue.fifo'
module.exports.checkSizeOfQueue = async (event) => {
  console.log('event test', event)
  const queueHighPriority = process.env.HIGH_PRIORITY_QUEUE
  const queueMiddlePriority = process.env.MIDDLE_PRIORITY_QUEUE
  const defaultQueue = process.env.NO_PRIORITY_QUEUE

  const queuesToCheck = [];
  queuesToCheck.push(queueHighPriority, queueMiddlePriority, defaultQueue)
  //console.log(`queueUrl`, queuesToCheck);

  //get properties from all queues
  const queueProperties = await Promise.all(
    queuesToCheck.map(async (queue) => {
      return await getQueueProperties(queue);
    })
  );

  await Promise.all(
    queueProperties.map(async (queue) => {

      //POC JUST CHECK IF WE HAVE MORE MESSAGES THAN THRESHOLD FOR HIGH PRIORITY QUEUE
      //console.log('queue to Attributes', queue.Attributes);
      const arn = queue.Attributes.QueueArn;
      if (arn == arnHighPriorityQueue) {
        console.log('founded');
        //check if the HIGHprioritization queues has too much messages to be read
        console.log('how many', queue.Attributes);
        const totalMessages = queue.Attributes.ApproximateNumberOfMessages
        console.log('total messages on the queue', totalMessages);
        if (totalMessages >= queueThresholds) {
          console.log('condition is true', queueThresholds);
          //disable consumer for that queue based on the threshold
          const toChange = {
            arn: arnLowPriority,
            enable: false
          }
          console.log('changing the consumer', toChange);
          await toogleEvent(toChange);
        }
        else {
          const toChange = {
            arn: arnLowPriority,
            enable: true
          }
          console.log('enabling the consumer', toChange);
          await toogleEvent(toChange);

        }
      }

    })
  );
  //console.log(`result`, data);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.eventToggle = async (event) => {
  console.log('eventToggle', event);

  const toChange = {
    arn: event.body.arn,
    enable: event.body.enable
  }

  toogleEvent(toChange);

}

module.exports.feedQueue = async (event) => {
  const queueUrl = process.env.HIGH_PRIORITY_QUEUE
  console.log(`feed the queuess`, event);
  try {
    for (let index = 0; index < 20; index++) {
      const message = {
        "channel": "EMAIL",
        "data": { "key": `the index is ${index}` }
      }
      const params = {
        MessageBody: JSON.stringify(message),
        QueueUrl: queueUrl,
        MessageGroupId: uuid()
      }
      return await sqs.sendMessage(params).promise();
    }
    console.log(' after for')

  } catch (err) {
    console.log(err)
    throw err;
  }
}

module.exports.readingQueue = async (event) => {
  console.log('event', event);
}
async function toogleEvent(toChange) {
  console.log('eventToggle ', toChange);
  await switcher.eventSwitcher({
    arn: toChange.arn,
    enable: toChange.enable
  });
}

async function getQueueProperties(queue) {
  //console.log('queuesToCheck', queue);
  var params = {
    QueueUrl: queue,
    AttributeNames: ['All']
  };
  const response = await sqs.getQueueAttributes(params).promise();
  //console.log(`response`, response);
  return response;
}

