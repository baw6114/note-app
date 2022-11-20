// stacks/ApiStack.ts
import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
  // 다른 스택에서 접근할 수 있도록 선언
  public api;

  constructor(scope: sst.App, id: string, props?: any) {
    super(scope, id, props);

    const { table } = props;

    // API 생성 (두번째 인자에 본인 이니셜을 포함해 ID를 넣어주자)
    this.api = new sst.Api(this, "api-chs", {
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        "POST /notes": "src/create.main",
        "GET /notes/{id}": "src/get.main",
        "GET /notes": "src/list.main",
        "PUT /notes/{id}": "src/update.main",
        "DELETE /notes/{id}": "src/delete.main",
      },
    });

    // API가 DynamoDB 테이블에 접근할 수 있도록 권한 설정
    this.api.attachPermissions([table]);

    // API의 EndPoint Url을 노출
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}