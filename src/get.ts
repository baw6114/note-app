// src/get.ts
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME!,
    // DyanomDB에서 primaryKey, sortKey 2개가 제공되어야 한다.
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // primaryKey (유저아이디)
      noteId: event.pathParameters.id, // sortKey (메모아이디)
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // 조회한 결과를 돌려준다.
  return result.Item;
});