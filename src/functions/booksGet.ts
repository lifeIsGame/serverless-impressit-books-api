import odmClient from '../utils/odmClient';
import { ICallback, IEvent } from '../types/functionTypes';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const headers = {
  'Content-Type': 'application/json',
};

const TableName = 'books';

export const handler = async (event: IEvent, context: any, callback: ICallback) => {
  const uuid = event.pathParameters.bookUuid;

  const params: DocumentClient.GetItemInput = {
    TableName,
    Key: {
      uuid,
    },
  };

  try {
    const promise: DocumentClient.GetItemOutput = await odmClient.get(params).promise();
    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify(promise),
    };
    callback(null, response);
  } catch (error) {
    const response = {
      statusCode: error.statusCode || 501,
      headers,
      body: JSON.stringify(error),
    };
    callback(null, response);
  }
};
