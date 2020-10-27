import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  constructor(private userService: UserService, public dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }, private toastr: ToastrService) { 
      this.userService.dialogDelete = this.dialogRef;
    }

  ngOnInit(): void {
  }

  close() {
    this.userService.dialogDelete.close();
  }

  deleteUser() {
    this.userService.deleteUser(this.data.user.id)
    .subscribe((data:any)=>{
      this.toastr.success("", "Successfully deleted user!");
      this.userService.removeFromUsers(this.data.user);
      this.userService.dialogDelete.close();
    }, (err) => {
      console.log(err);
    })
  }

}
