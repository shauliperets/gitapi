import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  data: any;
  input: any;
  items: any = [];

  repositoryForm = new FormGroup({
    input: new FormControl(),
  });

  constructor(private http: HttpClient) {
    //console.log(this.items);
  }

  columns: string[] = ['avatar', 'name', 'Bookmark'];

  search() {
    this.input = this.repositoryForm.controls['input'].value;
    console.log(this.input);

    this.http
      .get('https://api.github.com/search/repositories?q=' + this.input)
      .subscribe((data) => {
        this.items = Object.values(data)[2];

        console.log(this.items);
      });
  }

  bookmark(details: any) {
    console.log(details);

    this.http
      .post<any>('https://localhost:5001/api/data/', details, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
        }),
      })
      .subscribe((response) => {
        console.log('response ==>', response);
      });
  }

  getBookmark() {
    this.http.get('https://localhost:5001/api/data/').subscribe((data) => {
      //this.records = data;
      console.log(data);
    });
  }

  ngOnInit(): void {}
}
