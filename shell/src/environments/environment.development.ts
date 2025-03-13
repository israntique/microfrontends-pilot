export const environment = {
  production: false, // Indicates that this is a development environment
  msalLoggingEnable: true,
  apiUrl: 'http://localhost:5054/api',
  workDeskUrl: 'https://mvp.dev-unified.iaa.local/', // Place redirect url for worker desc
  initiatorReport: 'https://yazam.dev-unified.iaa.local/', // Place redirect url for initiator report
  spinnerShowDelay: 500, // in milisecond
  entraIdConfig: {
    auth: {
      clientId: 'a70d5f23-94f3-4305-98b2-9eaa53010355', // Azure Entra ID client ID
      authority:
        'https://login.microsoftonline.com/14011d5f-65a5-4d3e-becc-2894a6bafb41', // Authority URL for Entra ID
      redirectUri: 'http://localhost:4200', // Redirect URI after login
      scopes: ['User.Read'], // Scopes for authentication
    },
  },
};
