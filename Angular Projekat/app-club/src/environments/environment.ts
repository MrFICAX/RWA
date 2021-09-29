// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//import { domain, clientId } from "../../auth_config.json"

 //import { domain, clientId } from '../../auth_config.json';
// import * as config  from '../../auth_config.json';

export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
  auth: {
    domain: "dev-e2plpb1y.us.auth0.com",
    clientId: "rKep4iP6Qh47FYIWjWbh9EOkh2QjPm2j",
    redirectUri: window.location.origin,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
