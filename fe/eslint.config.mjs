import prettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  { ignores: ['dist/', 'node_modules/'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommended, prettierRecommended],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
)
