export class Book {
  constructor(
    public userUID: string,
    public title: string,
    public author: string,
    public published: Date,
    public listTag?: string[],
    public pictureBook?: string,
    public id?: string,
    public payload?: any,
  ){}
}
