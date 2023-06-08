
import request, { AxiosStatic } from 'axios'
import {
  LafAiSdkInterface
} from './lafai.interface.js'

import { IChatGPT } from './chatgpt.interface.js'
import  { ChatGPTAPI, ChatGPTAPIOptions }  from 'chatgpt'
export class LafAi implements LafAiSdkInterface {
  
  /**
   * This method should be overwrite
   * @returns
   */


  fetch: AxiosStatic = request
}
