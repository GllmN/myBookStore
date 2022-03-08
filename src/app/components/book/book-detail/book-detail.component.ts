import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/Book.model";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from '@angular/common';
import {BooksService} from "../../../services/books.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  idDocBook!: any;
  book: any;
  date!: Date;
  tags!: string[];
  pictureBook!: string[];

  constructor(private activatedRoute: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {

    this.book = new Book('', '', '', this.date,[]);

    this.idDocBook = this.activatedRoute.snapshot.params['id'];

    this.booksService.getSingleBook(this.idDocBook).subscribe(
      (book: Book) => {
        this.book = book;
        console.log(this.book);
        this.tags = this.book.listTag!;
        this.pictureBook = this.book.pictureBook;

        // Transforms the JSON object into an array
        // this.index = Object.keys(this.book);

        // Go to the first element of the array
        // this.book = this.book[this.index[0]]
      }
    );
  }

  onBack() {
    this.router.navigate(['/book-list']);
  }
}
