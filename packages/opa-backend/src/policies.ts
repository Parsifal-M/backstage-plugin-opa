import { PolicyDecision } from '@backstage/plugin-permission-common';
import { PolicyQuery } from '@backstage/plugin-permission-node';
import { OpaClient } from './opa-client/opaClient';
import { AuthorizeResult } from '@backstage/plugin-permission-common';

  
export async function enforceMyCustomPolicy(opaClient: OpaClient) {
    return async (request: PolicyQuery): Promise<PolicyDecision> => {
      // Perform policy check using opaClient
      const result = await opaClient.evaluatePolicy('my-custom-policy', {
        input: {
          user: request.identity?.id ?? 'anonymous',
          action: request.permission.action,
          resource: request.permission.resource,
        },
      });
      return { result: result ? AuthorizeResult.ALLOW : AuthorizeResult.DENY };
    };
  }
  
  export async function enforceMyOtherCustomPolicy(opaClient: OpaClient) {
    return async (request: PolicyQuery): Promise<PolicyDecision> => {
      // Perform policy check using opaClient
      const result = await opaClient.evaluatePolicy('my-other-custom-policy', {
        input: {
          user: request.identity?.id ?? 'anonymous',
          resource: request.permission.resource,
        },
      });
      return { result: result ? AuthorizeResult.ALLOW : AuthorizeResult.DENY };
    };
  }
  