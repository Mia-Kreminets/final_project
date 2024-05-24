import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // mockUser?: UserInfo = {
  //   email: "name_lastname@lpnu.ua",
  //   id: 1,
  //   username: "white_rabbit"
  // };
  mockUser: any = undefined;
  userInfo = new BehaviorSubject<UserInfo | undefined>(this.mockUser);
  constructor() {
  }
}

export interface UserInfo {
  id: number;
  username: string;
  email?: string;
}