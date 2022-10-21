import * as uuid from "uuid"
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event: any) {
  // JSON으로 데이터를 넘겨 'event.body' 에서 파싱이 필요하다
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      // 실제 DynamoDB에 저장되는 정보들
      userId: "123", // 사용자 ID
      noteId: uuid.v1(), // 메모를 생성할 때 생성되는 고유ID (uuid 라이브러리 사용)
      content: data.content, // event.body 쪽에서 받은 정보
      attachment: data.attachment, // event.body 쪽에서 받은 정보
      createdAt: Date.now(), // 생성된 시간
    },
  };

  try {
    // DynamoDB에 데이터 입력
    await dynamoDb.put(params).promise();

    // 사용자에게 응답 Return
    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
}