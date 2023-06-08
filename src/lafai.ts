import request, { AxiosStatic } from 'axios'
import { LafAiSdkInterface } from './lafai.interface.js'

import { IChatGPT } from './chatgpt.interface.js'
import { ChatGPTAPI, ChatGPTAPIOptions } from 'chatgpt'
export class LafAi implements LafAiSdkInterface {
  constructor() {
    this._lafai = LafAi.create()
  }

  static create: () => LafAiSdkInterface

  private _lafai: LafAiSdkInterface

  private get lafai(): LafAiSdkInterface {
    if (!this._lafai) {
      this._lafai = LafAi.create()
    }
    return this._lafai
  }

  getChatGPT(options: ChatGPTAPIOptions): IChatGPT {
    return new ChatGPTAPI(options)
  }

  fetch: AxiosStatic = request
}
