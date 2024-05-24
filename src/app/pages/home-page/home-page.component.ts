import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { StorageService, UserInfo } from 'src/app/services/storage.service';
declare var particlesJS: any; // Declare particlesJS

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  hoveredText: string = 'Hello There';
  phrase: string[] = [];
  text: string[] = [
    'Keep calm and pretend Mondays don\'t exist',
    'Stressed, blessed, and coffee obsessed',
    'Not tired yet? Just wait!',
    'Stress level: Santa on December 24th',
    'You call it stress. I call it Monday',
    'Don\'t stress about stress',
    'Opress your stress',
    'Keep going buddy',
    'Show must go on',
    'Cheer up, the worst is yet to come',
    'Depressed, but well-dressed!'
  ];

  subsciptions: Subscription[] = [];
  userInfo?: UserInfo = undefined;
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private api: ApiService,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.updatePhrase(this.hoveredText);
    this.decodeText()
    setInterval( () => this.decodeText(), 20000);
    this.subsciptions.push(
      this.storage.userInfo.subscribe(
        res => this.userInfo = res
      )
    )
  }

  ngOnDestroy(): void {
    this.subsciptions.forEach((sub) => { sub?.unsubscribe });
  }

  updatePhrase(text: string): void {
    this.phrase = text.split('');
  }

  selectRandomPhrase() {
    let number = Number((Math.random() * 10).toFixed(0));
    this.updatePhrase(this.text[number]);
  }

  decodeText() {
    this.selectRandomPhrase();

    setTimeout(() => {
      const text = this.elementRef.nativeElement.querySelector('.decode-text');
      const children = Array.from(text.children);

      let state: any[] = [];
      children.forEach((child, index) => {
        this.renderer.removeClass(child, 'state-1');
        this.renderer.removeClass(child, 'state-2');
        this.renderer.removeClass(child, 'state-3');
        state[index] = index;
      });

      state = this.shuffle(state);

      children.forEach((child: any, index) => {
        const classes = child.classList;
        const state1Time = Math.round(Math.random() * (2000 - 300)) + 100;

        if (classes.contains('text-animation')) {
          setTimeout(() => this.firstStages(child), state1Time);
        }
      });
    }, 2000)
  }

  firstStages(child: HTMLElement) {
    if (child.classList.contains('state-2')) {
      this.renderer.addClass(child, 'state-3');
    } else if (child.classList.contains('state-1')) {
      this.renderer.addClass(child, 'state-2');
    } else if (!child.classList.contains('state-1')) {
      this.renderer.addClass(child, 'state-1');
      setTimeout(() => this.secondStages(child), 100);
    }
  }

  secondStages(child: HTMLElement) {
    if (child.classList.contains('state-1')) {
      this.renderer.addClass(child, 'state-2');
      setTimeout(() => this.thirdStages(child), 100);
    } else if (!child.classList.contains('state-1')) {
      this.renderer.addClass(child, 'state-1');
    }
  }

  thirdStages(child: HTMLElement) {
    if (child.classList.contains('state-2')) {
      this.renderer.addClass(child, 'state-3');
    }
  }

  shuffle(array: any[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
