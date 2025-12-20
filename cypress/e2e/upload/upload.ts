import { Given } from '@badeball/cypress-cucumber-preprocessor';

// NotAllowedError: The following error originated from your application code, not from Cypress. It was caused by an unhandled promise rejection.
// Failed to execute 'writeText' on 'Clipboard': Write permission denied.
Given('I grant write permission to clipboard', () => {
  Cypress.automation('remote:debugger:protocol', {
    command: 'Browser.grantPermissions',
    params: {
      permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
      origin: window.location.origin,
    },
  });
});
