import * as sst from "@serverless-stack/resources";
import ApiStack from "./ApiStack";
import StorageStack from "./storageStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x"
  });

  //Add more Stack
  const storageStack = new StorageStack(app, "storage-chs");
  new ApiStack(app, "api-chs", {table: storageStack.table})
}
