import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import pluginPlaywright from 'eslint-plugin-playwright'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
  skipFormatting,
  // ✅ 커스텀 규칙을 명시적으로 추가
  {
    name: 'custom-rules',
    rules: {
      'no-console': 'warn',
      // semi: ['error', 'always'],
      eqeqeq: ['error', 'always'],
      'no-unused-vars': 'error', // 혹시 누락돼 있다면 이 줄도
      '@typescript-eslint/no-require-imports': 'off', // `require` 사용 허용
      '@typescript-eslint/no-explicit-any': ['warn'], // 강제는 아니고 경고만
      '@typescript-eslint/no-unused-vars': 'warn', // 경고만으로 변경
    },
  },
)
