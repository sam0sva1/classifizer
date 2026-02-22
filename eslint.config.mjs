import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off'
    }
  },
  {
    ignores: ['build/**', 'node_modules/**', 'eslint.config.js']
  }
);
