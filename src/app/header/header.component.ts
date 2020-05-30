import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { User } from '../models/users';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  users$: Observable<User>;
  users: User;

  error: string;

  constructor(private userService: UserService,private route: ActivatedRoute,) { }
  userDisplayName = '';


  ngOnInit() {
    // init_plugins();\

    // this.user = this.userService.user;

    this.userService.getUsers().subscribe(
      (data: User) => this.users = data,
      error => this.error = error
    );

    /*this.users$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userService.getUser(+params.get('user'))
      )
    );*/
  }

}
