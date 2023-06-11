import { FunctionContext } from '@lafjs/cloud'
let prompt_token: string
let image_describe_token: string

export type JinnaaiOptimizeDTO = {
  //  必需的
  // 原有提示词待优化。它可以是单行或多行提示词。
  // 例子: write a poem about a cat
  prompt: string | undefined

  // string, 必需的
  // 从上传的图像中导出原始文本提示词。当给出此参数时，“prompt”参数将被忽略，并将被派生的提示词覆盖。您可以使用 base64 编码的 PNG（推荐）或图像 URL
  // 例子: data: image / png; base64, iVBORw0KGgoAAAANS, https://example.com/image.png
  imagePrompt: string | undefined

  // string, 必需的
  // 此提示词将用于的目标模型。
  // 允许值:
  // chatgpt
  // gpt - 4
  // stablelm - tuned - alpha - 7b
  // claude
  // cogenerate
  // text - davinci - 003
  // dalle
  // sd
  // midjourney
  // kandinsky
  // lexica
  targetModel: string | undefined
}

export type JinnaaiImageDescribeDTO = {
  image: string
  features: string[] | undefined
}

const getJinnaaiJsonHeader = (token: string) => {
  return {
    'x-api-key': `token ${token}`,
    'content-type': 'application/json',
  }
}

const responseWrapper = (data: any, code = 0) => {
  return {
    msg: 'ok',
    code,
    data,
  }
}

const errorResponse = (msg = 'error', code = 400) => {
  return {
    msg,
    code,
  }
}

// 提示词优化类
export class PromptOptimize { 
  // 单提示词
  async optimize(queryDTO: JinnaaiOptimizeDTO) {
    // const params = {
    //   prompt: "给我生成一个ppt",
    //   targetModel: 'chatgpt',
    //   imagePrompt: 'https://img.zcool.cn/community/01627a5c6f5b4da801203d221af89d.jpg@1280w_1l_2o_100sh.jpg'
    // }

    // const params = {
    //   data: {
    //     // prompt: "给我生成一个ppt",
    //     imagePrompt: 'https://img.zcool.cn/community/01627a5c6f5b4da801203d221af89d.jpg@1280w_1l_2o_100sh.jpg',
    //     targetModel: 'chatgpt',
    //   }
    // }

    if (!queryDTO || !queryDTO.prompt || !queryDTO.targetModel) {
      return errorResponse('params error')
    }

    const params = {
      data: {
        ...queryDTO,
      },
    }

    let bodyJSON = JSON.stringify(params)
    console.log('jinaaiOptimize bodyJSON===', bodyJSON)

    let res = await fetch('https://promptperfect.aigc.jinaai.cn/optimize', {
      headers: getJinnaaiJsonHeader(prompt_token),
      body: bodyJSON,
      method: 'POST',
    })

    let data = await res.json()
    // console.log('jinaaiOptimize===', data)

    return responseWrapper(data)
  }

  // 批量提示词优化
  async optimizeBatch(queryDtos: JinnaaiOptimizeDTO[]) {
    if (!queryDtos || !Array.isArray(queryDtos)) {
      return errorResponse('params error')
    }

    let paramsError = false
    for (let i = 0; i < queryDtos.length; i++) {
      let { prompt, targetModel } = queryDtos[i]
      if (!prompt || !targetModel) {
        paramsError = true
      }

      if (paramsError) {
        break
      }
    }

    if (paramsError) {
      return errorResponse('params error')
    }

    const params = {
      data: queryDtos,
    }

    let resp = await fetch(
      'https://promptperfect.aigc.jinaai.cn/optimizeBatch',
      {
        headers: getJinnaaiJsonHeader(prompt_token),
        body: JSON.stringify(params),
        // body: JSON.stringify({
        //   data: [{
        //     // prompt: "my first prompt",
        //     prompt: "write a poem about a cat",
        //     targetModel: 'gpt-4'
        //   },
        //   {
        //     // prompt: "my second prompt",
        //     prompt: "write a poem about a dog",
        //     targetModel: 'chatgpt'
        //   }]
        // }),
        method: 'POST',
      },
    )

    let data = await resp.json()
    // console.log('optimizeBatch===', data)

    return responseWrapper(data)
  }

  static modelKeyArr = ['1', '2']

  async dispatch(ctx: FunctionContext) {
    // const { body, query, method, headers } = ctx
    const { body, query } = ctx
    const { model } = query

    if (!model) {
      return errorResponse('model is null')
    }

    if (!PromptOptimize.modelKeyArr.includes(model)) {
      return errorResponse('model is null')
    }

    if ('1' === model) {
      return await this.optimize(body)
    }

    if ('2' === model) {
      return await this.optimizeBatch(body)
    }
  }
}

// 解释图片(根据图片，生成提示词)
export class DescribeImage {
  async describe(dtos: JinnaaiImageDescribeDTO) {
    if (!dtos || !Array.isArray(dtos)) {
      return errorResponse('params error')
    }

    let paramsError = false
    for (let i = 0; i < dtos.length; i++) {
      let { image } = dtos[i]
      if (!image) {
        paramsError = true
      }

      if (paramsError) {
        break
      }
    }

    if (paramsError) {
      return errorResponse('params error')
    }

    let params = {
      data: dtos,
    }

    let resp = await fetch('https://scenex.aigc.jinaai.cn/describe', {
      headers: getJinnaaiJsonHeader(image_describe_token),
      body: JSON.stringify(params),
      method: 'POST',
    })

    let data = await resp.json()
    // console.log('optimizeBatch===', data)

    return responseWrapper(data)
  }

  static modelKeyArr = ['1', '2']

  async dispatch(ctx: FunctionContext) {
    // const { body, query, method, headers } = ctx
    const { body, query } = ctx
    const { model } = query

    if (!model) {
      return errorResponse('model is null')
    }

    if (!PromptOptimize.modelKeyArr.includes(model)) {
      return errorResponse('model is null')
    }

    if ('1' === model) {
      return await this.describe(body)
    }
  }
}

export class JinaClient {
  promptToken: string;
  imageDescribeToken: string;
  modelKeyArr = ['1', '2'];
  
  constructor(promptToken: string, imageDescribeToken: string) {
    this.promptToken = promptToken;
    this.imageDescribeToken = imageDescribeToken;
  }
  async optimizePrompt(ctx: FunctionContext) {
    const { queryDtos, queryDTO } = ctx.body;
    const promptOptimize = new PromptOptimize();
    if (queryDtos) {
      return await promptOptimize.optimizeBatch(queryDtos);
    } else if (queryDTO) {
      return await promptOptimize.optimize(queryDTO);
    } else {
      return errorResponse('invalid input');
    }
  }

  async describeImage(ctx: FunctionContext) {
    const describeImage = new DescribeImage()
    const { body, query, headers } = ctx
    const { model } = query

    if (!model) {
      return errorResponse('model is null')
    }

    if (!PromptOptimize.modelKeyArr.includes(model)) {
      return errorResponse('invalid model')
    }

    const dto: JinnaaiImageDescribeDTO = {
      image: body.image,
      features: body.features,
    }

    if (model === '1') {
      return await describeImage.describe(dto)
    }

    return errorResponse('invalid model')
  }
}
