import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {Book} from "../../../models/Book.model";
import {AuthService} from "../../../services/auth.service";
import {ProfilService} from "../../../services/profil.service";
import {BooksService} from "../../../services/books.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";

//Format date
import { MAT_DATE_FORMATS } from '@angular/material/core';

// export const MY_DATE_FORMATS = {
//   parse: {
//     dateInput: 'DD/MM/YYYY',
//   },
//   display: {
//     dateInput: 'DD/MM/YYYY',
//     monthYearLabel: 'MMMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY'
//   },
// };

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  // providers: [
  //   { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  // ]
})
export class BookFormComponent implements OnInit {

  idBook!: any;
  book!: Book;
  isAddBook = true;
  bookForm!: FormGroup;
  isConnected = false;
  UID!: string;

  //For published
  minYear = new Date();
  maxYear = new Date(Date.now());

  //For tags
  tags!: string[];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  //For file
  fileIsUploading = false;
  fileUploaded = false;
  fileUrl!: string;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private authService: AuthService,
              private profilService: ProfilService,
              private fireAuth: AngularFireAuth,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['id'];

    this.isAddBook = !id || this.activatedRoute.snapshot.url[0].path === 'book-list'

    this.fireAuth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.isConnected = true;

          this.UID = user.uid;

          this.booksService.getSingleBook(id).subscribe(
            (book: Book) => {
              this.book = book;

              if (!this.isAddBook) {
                this.tags = this.book.listTag!;
                this.initBookFormUpdate()
                this.idBook = id;
                console.log(this.book);

              } else {
                this.tags = [
                  '2020', '2022', 'Roman',
                  'Philosophie', 'Science fiction', 'Top Seller',
                  'Coup coeur', 'Prix Goncourt']
                this.initBookFormAdd()
                console.log('test')
              }
            }
          );
        } else {
          this.isConnected = false;
        }
      });
  }

  /**
   * Update form book
   */
  initBookFormUpdate(): void {
    this.bookForm = this.formBuilder.group({
      title : [this.book.title,Validators.required],
      author : [this.book.author,Validators.required],
      published : [this.book.published,Validators.required],
      listTag : [this.tags,Validators.required],
      // pictureBook: [this.book.pictureBook,Validators.required]
    });
  }

  /**
   * Add form book
   */
  initBookFormAdd(): void {
    this.bookForm = this.formBuilder.group({
      title : ['',Validators.required],
      author : ['',Validators.required],
      published : ['',Validators.required],
      listTag : [this.tags,Validators.required],
      // pictureBook : ['',Validators.required]
    });
  }

  /**
   * Form for new book
   */
  onSaveBook(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if(this.isAddBook){
      const userUID = this.UID;
      const title = this.bookForm.get('title')!.value;
      const author = this.bookForm.get('author')!.value;
      const published: Date = this.bookForm.get('published')!.value;
      const listTag = this.listOfTagsSelected();
      //const pictureBook = this.bookForm.get('pictureBook')!.value

      const newBook = new Book(userUID,title,author,published,listTag);
      console.log('onSaveBook :', newBook)

      //
      if (this.fileUrl && this.fileUrl !== '') {
        newBook.pictureBook = this.fileUrl;
      }

      // Send object to database and redirect to detail
      this.booksService.createBook(newBook).then(
        bookAdded => {
          this.booksService.navigateToBookDetail(bookAdded.id);
        })
    } else {
      this.book.title = this.bookForm.get('title')!.value;
      this.book.author = this.bookForm.get('author')!.value;
      this.book.published = this.bookForm.get('published')!.value;
      this.book.listTag = this.listOfTagsSelected();

      // Update object to database and redirect to detail
      this.booksService.updateBook(this.book, id).then(
        () => {
          this.booksService.navigateToBookDetail(id);
        }
      )
    }
  }

  /****************** Tags ***************/

  /**
   * Add tag in form
   * @param event
   */
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  /**
   * Delete tag in form
   * @param tag
   */
  deleteTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  /**
   * List of tags selected
   */
  listOfTagsSelected() {
    return this.tags
  }

  /****************** Upload File ***************/

  onUploadFile(file: File) {
    this.fileIsUploading = true
    return this.booksService.uploadFile(file)
    //   .then(
    //   (url: any) => {
    //     this.fileUrl = url;
    //     this.fileIsUploading = false;
    //     this.fileUploaded = true;
    //   }
    // );
  }

  detectFiles(event: any) {
    this.onUploadFile(event.target.files[0]);
  }
}
