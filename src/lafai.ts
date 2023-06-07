
import request, { AxiosStatic } from 'axios'
import {
  LafAiSdkInterface
} from './lafai.interface.js'

import { IChatGPT } from './chatgpt.interface.js'
import  { ChatGPTAPIOptions }  from 'chatgpt'
export class LafAi implements LafAiSdkInterface {
  
  /**
   * This method should be overwrite
   * @returns
   */
  private _chatgpt: IChatGPT; 
  
  private async _createChatGPT(options: ChatGPTAPIOptions):Promise<IChatGPT> {
    const { ChatGPTAPI } = await import('chatgpt');
    return new ChatGPTAPI(options);
  }
 
  
  getChatGPT(options?: ChatGPTAPIOptions): IChatGPT {
    if (!this._chatgpt) {
      this._chatgpt = this._createChatGPT(options);
    }
    return this._chatgpt;
  }
  
  fetch: AxiosStatic = request
}
