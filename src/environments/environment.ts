// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiCollaborateur : 'http://localhost:8080/apic',
  apiAppointment : 'http://localhost:8080/app',
  apiMetier: 'http://localhost:8080/apim',
  apiPeriodessai: 'http://localhost:8080/apipe',
  apiParametre: 'http://localhost:8080/apiparametre',
  apiRole: 'http://localhost:8080/apir',
  apiPrivilege: 'http://localhost:8080/apipri',
  apiUtilisateurs: 'http://localhost:8080/apiu'




};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
