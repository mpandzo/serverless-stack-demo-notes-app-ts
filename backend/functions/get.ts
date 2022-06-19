import { APIGatewayProxyEvent } from "aws-lambda";

import handler from "../util/handler";
import dynamoDb from "../util/dynamoDb";

export const main = handler(async (event: APIGatewayProxyEvent) => {
  const params = {
    TableName: process.env.TABLE_NAME || "temp",
    // "Key" defines the partition key and sort key of the item to be retrieved
    Key: {
      userId: event.requestContext.authorizer ? event.requestContext.authorizer.iam.cognitoIdentity.identityId : "", // The id of the author
      noteId: event.pathParameters ? event.pathParameters.id : "", // The id of the note from the path
    },
  };

  const result = await dynamoDb.get(params);

  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});