import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/main-form/form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CabinetComponent } from './pages/personal-cabinet/cabinet.component';
import { SignupPageComponent } from './pages/signup-pages/signup-page.component';
import { AboutStressPageComponent } from './pages/about-stress-page/about-stress-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { MainChartComponent } from './components/main-chart/main-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FormComponent,
    LoginPageComponent,
    SignupPageComponent,
    HeaderComponent,
    FooterComponent,
    CabinetComponent,
    AboutStressPageComponent,
    AboutUsComponent,
    AboutUsPageComponent,
    MainChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
