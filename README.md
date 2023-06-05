# @juukee/lafai is The cloud sdk for laf AI

```ts
import cloud from '@lafjs/cloud'
import LafAi from '@juukee/lafai'
exports.main = async function (ctx) {
  const lafAi = new LafAi()
  const chatgpt = lafAi.getChatGPT({
    apiKey: 'your-key',
    modelId: 'model_special',
  })
}
```
