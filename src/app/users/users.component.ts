import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { UserNewComponent } from 'src/app/users/user-new/user-new.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openNewUserDialog(){
    this.dialog.open(UserNewComponent, {
      width: '800px',
  });
  }

}
