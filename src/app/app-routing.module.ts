import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-pages/signup-page.component';
import { CabinetComponent } from './pages/personal-cabinet/cabinet.component';
import { AboutStressPageComponent } from './pages/about-stress-page/about-stress-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'cabinet', component: CabinetComponent },
  { path: 'stress', component: AboutStressPageComponent },
  { path: 'about-us', component: AboutUsPageComponent },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
