export interface IMessage{
  userid:string
  name: string
  email: string
  telephone: string
  message: string
}

export interface IMessageGet{
  error: string,
  data: IMessage[]
}
