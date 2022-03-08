import { Injectable } from '@angular/core';
import {Book} from "../models/Book.model";
import {finalize, Observable, Subscription} from "rxjs";
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
  uploadPercent!: Observable<any>
  downloadURL!: Subscription
  urlPictureBookStorage: any;


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
        urlPictureStorage: book.urlPictureStorage,
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
        urlPictureStorage: book.urlPictureStorage
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
   * Upload picture book in a Storage
   * @param: file: file of a picture book
   */
  uploadPictureBook(file:File) {
    const almostUniqueFileName = Date.now().toString();

    // create path
    const filePath = 'picturesBooks/' + almostUniqueFileName + '_' + file.name;
    const fileRef = this.storage.ref(filePath);

    return new Promise<any>((resolve, reject) => {
      const task = this.storage.upload(filePath, file);

      // observe percentage changes
      this.uploadPercent = task.percentageChanges();

      // get notified when the download URL is available
      task.snapshotChanges()
        .pipe(
          finalize(
            () => {
              return this.downloadURL = fileRef.getDownloadURL().subscribe(
                url => {
                  this.urlPictureBookStorage = url;
                  console.log('upload success')
                  console.log(this.urlPictureBookStorage)
                  return this.urlPictureBookStorage
                },
              );
            }
          )
        )
        .subscribe(
          url => {
            this.urlPictureBookStorage = url;
            console.log('upload running')
          }
        )
    });
  }

  getDownloadUrl(storagePath: string): Promise<string> {
    return this.storage.ref(storagePath).getDownloadURL().toPromise();
  }





}

