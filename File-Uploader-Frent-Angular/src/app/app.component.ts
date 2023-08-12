import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'File-Uploader-Frent-Angular';

  users = [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "city": "New York"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "age": 28,
      "city": "Los Angeles"
    },
    {
      "id": 3,
      "name": "Mike Johnson",
      "email": "mike@example.com",
      "age": 35,
      "city": "Chicago"
    },
    {
      "id": 4,
      "name": "Emily Brown",
      "email": "emily@example.com",
      "age": 25,
      "city": "San Francisco"
    }
  ]

  constructor(){
    console.log(this.users);
  }
}
