import { LafAiSdkInterface } from './lafai.interface.js'
import { JinaClient } from './jinaai.js'
import { Cloud } from '@lafjs/cloud'

export class LafAi extends Cloud {
    constructor() {
        super();
        this.jinnai = new JinaClient();
    }
jinnai: JinaClient;
}
