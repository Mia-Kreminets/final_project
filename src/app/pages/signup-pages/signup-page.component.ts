import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit, AfterViewInit {

  username: string = '';
  email: string = '';
  password: string = '';
  age: string = '';
  passwordFieldType: string = 'password';
  error: string = '';

  constructor(private router: Router, private api: ApiService, private storage: StorageService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }


  scrollToBottom(): void {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {

    if (this.username && this.email && this.password && !!Number(this.age)) {
      const signupData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.api.signup(signupData).subscribe(
        response => {
          if(response.data) {
            this.storage.userInfo.next(response.data);
            this.router.navigate(['/home']);
          }
        },
        error => {
          console.error('SignUp failed', error.error);
          this.error = error.error ? error.error + '. Please Try Another One' : 'Something is broken. Please try later';
        }
      );
    } else {
      alert('Please fill in all fields');
    }
  }
  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
