import { Component, OnInit } from '@angular/core';
import { Statement } from '@angular/compiler';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name:string;
  age:number;
  email:string;
  address:Address;
  hobbies:string[];
  hello:any;
  posts:any;
  isEdit:boolean = false;

  constructor(private dataService:DataService) {
    console.log('Constructor ran...');
  }

  ngOnInit() {
    console.log('ngOnInit ran...');

    this.name = 'John Doe';
    this.age = 30;
    this.email = 'johnDoe@simpleton.pizza';
    this.address = {
      street: '50 Main st',
      city: 'Boston',
      state:'MA'
    }
    this.hobbies = ['Write code', 'Watch movies', 'Listen to Music'];
    this.hello = 'Howdy';

    this.dataService.getPosts().subscribe((p) => {
      console.log(p);
      this.posts = p;
    });
  }

  onClick() {
    this.name='Daniel Copeland';
    this.hobbies.push('New Hobby');
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  addHobby(hobby) {
    console.log(hobby);
    this.hobbies.push(hobby);
    return false;
  }

  deleteHobby(hobby){
    console.log(`Deleting ${hobby} from Hobbies`);
    for(let i=0; i<this.hobbies.length; i++) {
      if(this.hobbies[i]== hobby) {
        this.hobbies.splice(i, 1);
      }
    }
  }

}


interface Address{
  street:string,
  city:string,
  state:string
}

interface Post{
  id:number,
  title:string,
  body:string,
  userId:number
}
