import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { UserNewComponent } from 'src/app/users/user-new/user-new.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public authService: AuthService, public userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.fetchAllUsers();
  }

  openNewUserDialog(){
    this.dialog.open(UserNewComponent, {
      width: '800px',
  });
  }

}
