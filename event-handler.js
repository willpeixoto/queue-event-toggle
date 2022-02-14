var AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });
const lambda = new AWS.Lambda();

const eventSwitcher = async (req) => {
  console.log('switcher', req);
  // const params = {

  // }
  const eventSource = await lambda.listEventSourceMappings({
    EventSourceArn: req.arn
  }).promise();
  //const event = await getEventSourceId(eventSource.UUID)
  const params = {
    UUID: eventSource.EventSourceMappings[0].UUID,
    enabled: req.enable
  }
  await toggleEventSource(params)
};

const getEventSourceId = async (params) => {

  //await delay(15);
  console.log(`event source map Id`, params.eventSourceId);
  const eventId = params.eventSourceId
  const result = await lambda.getEventSourceMapping({
    UUID: eventId
  }).promise();


}
const toggleEventSource = async (params) => {
  console.log('params', params)
  await lambda.updateEventSourceMapping({
    UUID: params.UUID,
    Enabled: params.enabled
  }).promise();
  console.log('done ? ')
  //return await eventChangeStatus(globObj);
}

module.exports = {
  eventSwitcher,
  getEventSourceId,
  toggleEventSource
}
