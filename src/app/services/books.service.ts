import { Injectable } from '@angular/core';
import {Book} from "../models/Book.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";


@Injectable({
  providedIn: 'root'
})

export class BooksService {

  books: Book[] = [];
  isActive!: boolean;
  //urlDatabaseFire = environment.firebase;

  constructor(private firestore: AngularFirestore,
              private storage : AngularFireStorage,
              private router : Router) { }

  /**
   * Get list all books of current user
   */
  getAllBooksOfCurrentUser(id: string)  {
    return this.firestore
      .collection('/book-list', ref => ref.where("userUID", "==", id))
      .snapshotChanges();

    // **** Deprecated : .subscribe ****
    // .subscribe(
    //   snapshot => snapshot.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    //     }),
    //   error => console.log(error),
    //   () => console.log('finished')
    // );

    // **** Deprecated : toPromise ****
    // .toPromise()
    // .then((snapshot) => {
    //   snapshot?.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // });
  }

  /**
   * Get a single book
   *
   */
  getSingleBook(id: string): Observable<any> {
    return this.firestore
      .collection<Book>('/book-list')
      .doc(id)
      .valueChanges();
  }

  /**
   * Create a book
   * @param book: object of book
   */
  createBook(book: Book){
    return this.firestore
      .collection<Book>('/book-list')
      .add({
        userUID: book.userUID,
        title: book.title,
        author: book.author,
        published: book.published,
        listTag: book.listTag,
        pictureBook: book.pictureBook,
      })
    //.then(() => alert(`Le livre ${book.title} a été ajouté`))
    //.catch((error) => alert("error: " + error));
  }

  /**
   * Updtate a book
   * @param book: object of book
   * @param id: id of doc (object) book
   */
  updateBook(book: Book, id: string){
    return this.firestore
      .collection<Book>('/book-list')
      .doc(id)
      .update({
        title: book.title,
        author: book.author,
        published: book.published,
        listTag: book.listTag,
        pictureBook: book.pictureBook
      });
  }

  /**
   * Delete a book
   * @param: book: object of book
   */
  deleteBook(book: Book) {
    // if(book.photo) {
    //   const storageRef = firebase.storage().refFromURL(book.photo);
    //   storageRef.delete().then(
    //     () => {
    //       console.log('Photo supprimée !');
    //     }
    //   ).catch(
    //     (error) => {
    //       console.log('Fichier non trouvé : ' + error);
    //     }
    //   );
    // }
    return this.firestore
      .collection<Book>('/book-list')
      .doc(book.payload.doc.id)
      .delete()
  }

  /**
   * Navigate to book update
   * @param id: id of the screen to edit
   */
  navigateToBookDetail(id: string){
    this.router.navigate(['/book-detail' , id]);
  }

  /**
   *
   */
  // uploadFile(file:File) {
  //   return new Promise(
  //     ((resolve, reject) =>  {
  //       const almostUniqurFileName = Date.now().toString();
  //       const upload = firebase
  //         .storage()
  //         .ref()
  //         .child('images/' + almostUniqurFileName + file.name)
  //         .put(file);
  //       upload.on(this.fireStorage.TaskEvent.STATE_CHANGED,
  //         () => {
  //         console.log('Chargement...')
  //         },
  //         (error) => {
  //           console.log('Erreur de chargement : ' + error);
  //           reject();
  //         },
  //         () => {
  //         resolve(upload.snapshot.ref.getDownloadURL());
  //         }
  //       )
  //     })
  //   )
  // }
  uploadFile(event: any) {
    const almostUniqueFileName = Date.now().toString();
    const file = event.target.files[0];
    const filePath = 'images/' + almostUniqueFileName + file.name;
    const task = this.storage.upload(filePath, file);
  }

  // upLoadImage(file:File, id:string): Promise<any> {
  //   const uniqueFileName = Date.now()
  //     .toString()
  //     + this.firestore
  //     .collection<Book>('/book-list')
  //     .doc(id);
  //   const path = '/images' + uniqueFileName + file.name
  //   return this.storage.upload(path, file).then((data) => this.getStorageMetadata(path))
  // }

  getDownloadUrl(storagePath: string): Promise<string> {
    return this.storage.ref(storagePath).getDownloadURL().toPromise();
  }



}

