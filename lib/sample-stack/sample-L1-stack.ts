import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class L1ConstructStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new cdk.aws_s3.CfnBucket(this, "MyL1Bucket", {
      // 名前の重複を避けるためにランダムな文字列を生成
      bucketName: "my-l1-bucket-" + Math.random().toString(36).substring(2, 15),
      versioningConfiguration: {
        status: "Enabled",
      },
      publicAccessBlockConfiguration: {
        blockPublicAcls: true,
        blockPublicPolicy: true,
        ignorePublicAcls: true,
        restrictPublicBuckets: true,
      },
    });
  }
}
