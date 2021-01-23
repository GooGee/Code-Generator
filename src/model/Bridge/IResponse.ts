import { ActionEnum } from './ActionEnum'

export default interface IResponse {
    action: ActionEnum
    data: any
    key: string
    message: string
    status: number
}
