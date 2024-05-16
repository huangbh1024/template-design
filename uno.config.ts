import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', '.git', 'dist']
    }
  },
  presets: [
    presetUno({ dark: 'class' }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
