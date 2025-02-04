import * as cdk from "aws-cdk-lib";
import * as patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as ecs from "aws-cdk-lib/aws-ecs";
import { Construct } from "constructs";

export class L3ConstructStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const loadBalancerService =
      new patterns.ApplicationLoadBalancedFargateService(this, "Service", {
        memoryLimitMiB: 1024,
        cpu: 512,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
          environment: {
            ENVIRONMENT: "production",
          },
        },
        publicLoadBalancer: true,
      });

    const scaling = loadBalancerService.service.autoScaleTaskCount({
      maxCapacity: 4,
      minCapacity: 2,
    });

    scaling.scaleOnCpuUtilization("CpuScaling", {
      targetUtilizationPercent: 70,
      scaleInCooldown: cdk.Duration.seconds(60),
      scaleOutCooldown: cdk.Duration.seconds(60),
    });
  }
}
