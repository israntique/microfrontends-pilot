import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  ProtectedResourceScopes,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { environment } from '../../environments/environment.development';

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.entraIdConfig.auth.clientId,
      authority: environment.entraIdConfig.auth.authority,
      redirectUri: environment.entraIdConfig.auth.redirectUri,
      postLogoutRedirectUri: '/',
      knownAuthorities: [environment.entraIdConfig.auth.authority],
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowPlatformBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Verbose,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map([
    ['https://graph.microsoft.com/v1.0/me', ['user.read']],
    ['https://graph.microsoft.com/v1.0/', ['user.read']],
  ]);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
    loginFailedRoute: '/login-failed',
  };
}
