# @juukee/lafai is The cloud sdk for laf AI

```ts
import cloud from '@lafjs/cloud'
import lafai from '@juukee/lafai'
exports.main = async function (ctx) {
  const chatgpt = lafai.getChatGPT({
    apiKey: 'your-key',
    debug: true
  })
}
```
