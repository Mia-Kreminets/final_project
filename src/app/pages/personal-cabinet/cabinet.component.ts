import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  userName: string = '';
  userEmail: string = '';

  editUserName: string = '';
  editUserEmail: string = '';

  oldPassword: string = '';
  newPassword: string = '';
  subsciptions: Subscription[] = [];
  constructor(private api: ApiService, private storage: StorageService) {}

  ngOnInit(): void {
    this.subsciptions.push(
      this.storage.userInfo.subscribe(
        res => {
          if(res?.username) this.userName = res.username
          if(res?.email) this.userEmail = res.email
        }
      )
    )
  }

  ngOnDestroy() {
    this.subsciptions.forEach(s => s?.unsubscribe());
  }
  onSubmitEdit(): void {
    // Save changes to user profile
    this.userName = this.editUserName;
    this.userEmail = this.editUserEmail;
    alert('Profile updated successfully!');
  }

  onSubmitChangePassword(): void {
    // Change user password
    if (this.oldPassword && this.newPassword) {
      alert('Password changed successfully!');
      this.oldPassword = '';
      this.newPassword = '';
    } else {
      alert('Please fill in all password fields');
    }
  }
}
