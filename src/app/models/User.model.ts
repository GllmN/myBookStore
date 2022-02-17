export class User {
  constructor(
    public username: string,
    public email: string,
    //public password: string,
    public userUID: any,
    public id?: string,
  ){}
}
