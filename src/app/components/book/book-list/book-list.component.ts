import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../../models/Book.model";
import {Subscription} from "rxjs";
import {BooksService} from "../../../services/books.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  user: any;
  isConnected= false;
  books: any;
  booksSubscription!: Subscription;
  title!: string;

  constructor(private booksService: BooksService,
              private router: Router,
              private fireAuth: AngularFireAuth) { }

  ngOnInit(): void {

    this.fireAuth.onAuthStateChanged(
      (user) => {
        if (user) {
          const userUID = user.uid;
          this.isConnected = true;
          this.booksSubscription = this.booksService.getAllBooksOfCurrentUser(userUID).subscribe(
            Book => {
              this.books = Book;
            });
        } else {
          this.isConnected = false;
        }
      });
  }

  /**
   * Navigate to book form
   */
  onCreateNewBook() {
    this.router.navigate(['/book-form']);
  }

  /**
   * Delete the book from list
   * @param book object
   */
  onDeleteBook(book: Book) {
    if(confirm("Voulez vous supprimer le livre suivant : ' " + book.payload.doc.data().title + " ', ( ID : " + book.payload.doc.id + " )")){
      this.booksService.deleteBook(book);
    }
  }

  /**
   * Unsubscribe
   */
  ngOnDestroy() {
    console.log('ngDestroy called')
    this.booksSubscription.unsubscribe();
  }

}

