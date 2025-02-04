import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class L2ConstructStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, "MyL2Bucket", {
      // 名前の重複を避けるためにランダムな文字列を生成
      bucketName: "my-l1-bucket-" + Math.random().toString(36).substring(2, 15),
      versioned: true,
      // デフォルトではパブリックアクセスをブロックする
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      // デフォルトで暗号化も実施される
      encryption: s3.BucketEncryption.S3_MANAGED,
      // ライフサイクルの設定も簡単に実装できる
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(90),
          transitions: [
            {
              storageClass: s3.StorageClass.INTELLIGENT_TIERING,
              transitionAfter: cdk.Duration.days(30),
            },
          ],
        },
      ],
    });
  }
}
