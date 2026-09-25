import { defineConfig } from 'cypress';
import allureWriter from '@shelex/cypress-allure-plugin/writer';
import { fsTasks } from '@/../cypress/tasks/fsTasks';

export default defineConfig({
  e2e: {
    baseUrl: 'https://quero-ler-stg.netlify.app/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(_on, _config) {
      allureWriter(_on, _config);
      _on('task', fsTasks);
      return _config;
    },
    env: {
      allure: true,
    },
  },
});
