import { ActionEnum } from './ActionEnum';
import IResponse from './IResponse'

export default class Response implements IResponse {
    constructor(public action: ActionEnum,
        public key: string,
        public data: string,
        public message: string,
        public status: number) {
    }
}
