import IResponse from './IResponse'

export default interface IHandler {
    (data: IResponse): void
}
