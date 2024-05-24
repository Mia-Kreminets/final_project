import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { StorageService, UserInfo } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subsciptions: Subscription[] = [];
  userInfo?: UserInfo;

  constructor(private router: Router, private storage: StorageService) { }

  ngOnInit(): void {
    this.subsciptions.push(
      this.storage.userInfo.subscribe(
        res => this.userInfo = res
      )
    )
  }

  ngOnDestroy() {
    this.subsciptions.forEach(s => s?.unsubscribe());
  }

  logout() {
    this.storage.userInfo.next(undefined);
    this.navigate('/login');
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
