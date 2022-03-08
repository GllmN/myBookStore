import {Observable} from "rxjs";

export class Book {
  constructor(
    public userUID: string,
    public title: string,
    public author: string,
    public published: Date,
    public listTag?: string[],
    public urlPictureStorage?: string,
    public id?: string,
    public payload?: any,
  ){}
}
