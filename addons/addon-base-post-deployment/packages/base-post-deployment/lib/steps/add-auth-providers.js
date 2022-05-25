/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 *  or in the "license" file accompanying this file. This file is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *  express or implied. See the License for the specific language governing
 *  permissions and limitations under the License.
 */

const Service = require('@amzn/base-services-container/lib/service');
const authProviderConstants = require('@amzn/base-api-services/lib/authentication-providers/constants')
  .authenticationProviders;

const settingKeys = {
  defaultIdpType: 'defaultIdpType',
};

class AddAuthProviders extends Service {
  constructor() {
    super();
    this.dependency(['oidcAddAuthProvider', 'cognitoAddAuthProvider']);
  }

  async execute() {
    // Setup auth provider according to defaultIdpType config
    // federated IdP auth provider (if configured)
    const defaultIdpType = this.settings.get(settingKeys.defaultIdpType);
    switch (defaultIdpType) {
      case authProviderConstants.oidcAuthProviderTypeId: {
        const oidcAddAuthProvider = await this.service('oidcAddAuthProvider');
        await oidcAddAuthProvider.addAuthenticationProvider();
        break;
      }
      case authProviderConstants.cognitoAuthProviderTypeId: {
        const cognitoAddAuthProvider = await this.service('cognitoAddAuthProvider');
        await cognitoAddAuthProvider.addAuthenticationProvider();
        break;
      }
      default:
        console.log(`Sorry, we are out of ${defaultIdpType}.`);
    }
  }
}

module.exports = AddAuthProviders;
