import { defineConfig } from 'cypress';
import allureWriter from '@shelex/cypress-allure-plugin/writer';

export default defineConfig({
  e2e: {
    baseUrl: 'https://queroler-frontend.vercel.app/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(_on, _config) {
      allureWriter(_on, _config);
      return _config;
    },
    env: {
      allure: true,
    },
  },
});
