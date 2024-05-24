import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, AfterViewInit {

  username: string = '';
  password: string = '';

  passwordFieldType: string = 'password';
  error: string = '';


  @ViewChild('form') form!: ElementRef;
  
  constructor(
    private router: Router, 
    private api: ApiService,
    private storage: StorageService
  ) { }

  ngOnInit(): void { 

  }

  ngAfterViewInit(): void {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {
    if (this.username && this.password) {
      this.api.login({ username: this.username, password: this.password}).subscribe(
        response => {
          this.storage.userInfo.next(response.data);
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed', error.error);
          this.error = error.error ? error.error + '. Please Try Again' : 'Something is wrong. Please try later';
        }
      );
    } else {
      alert('Please fill in both fields');
    }
  }
}
