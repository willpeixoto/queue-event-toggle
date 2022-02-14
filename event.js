
const objTosend = {
  "TopicArn": "arn:aws:sns:us-east-2:166083508693:notification-platform-fanout-int-filter-topic.fifo",
  "Message": "[{\"channel\":\"EMAIL\",\"ReferenceId\":\"13e60ac3-7279-43e1-a2f6-827edb1cb20c\",\"data\":{\"CommunicationChannel\":{\"Code\":\"E\"},\"Recipient\":\"will.peixoto@serverlessguru.com\",\"TemplateIdentifier\":\"ACBaggageDropLaunchEN\",\"Subject\":\"\",\"Body\":\"\",\"NotificationParameters\":[{\"key\":\"FlightLegDepartureAirportCity\",\"value\":\"Vancouver\"},{\"key\":\"FirstName\",\"value\":\"PAULA\"},{\"key\":\"FlightLegDepartureAirportIATACode\",\"value\":\"YVR\"},{\"key\":\"BaggagePickupAirportCity\",\"value\":\"Paris\"},{\"key\":\"BaggagePickupAirportIATACode\",\"value\":\"CDG\"},{\"key\":\"RecordLocator\",\"value\":\"3FG2AW\"}],\"IsHTML\":false,\"IsDelivered\":false,\"Attachments\":[]}},{\"channel\":\"SMS\",\"ReferenceId\":\"13e60ac3-7279-43e1-a2f6-827edb1cb20c\",\"data\":{\"CommunicationChannel\":{\"Code\":\"S\"},\"Recipient\":\"+5511946281283\",\"Body\":\"Booking Reference 3FG2AW. Your baggage will be available for pickup at Paris (CDG). Enjoy your flight!\",\"NotificationParameters\":[],\"IsHTML\":false,\"IsDelivered\":false}}]",
  "MessageAttributes": {
    "Channels": {
      "DataType": "String.Array",
      "StringValue": "[\"EMAIL\",\"SMS\"]"
    }
  },
  "MessageGroupId": "5e71f2ed1cfb523033d5f333ebcb9dfc89e2563f",
  "MessageDeduplicationId": "13e60ac3-7279-43e1-a2f6-827edb1cb20c"
}
