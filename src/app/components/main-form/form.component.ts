import { Component, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'detection-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public isStressed: 'YES' | 'NO' | undefined = undefined;
  public comment: string = '';
  public tipsText = ['So, all you need to do now is to write how u feel into the box...', 'Wait a liitle bit while we perfom some magic...', 'We detected that u feel ', 'Something is wrong, something is really wrong, BAD, CATASTROPHIC, to be precise...']
  public tipIndex = 0;
  public isLoading: boolean = false;
  public freezeStatus = new EventEmitter<boolean>(false);
  public previousMessage: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  public doSomeMagic() {
    if (this.isStressed && this.tipIndex === 2  && this.previousMessage === this.comment) {
      this.next();
      return;
    }
    if (this.comment) {
      this.freezeStatus.emit(true);
      this.isLoading = true;
      this.tipIndex = 1;

      this.api.getEstimate(this.comment).subscribe(
        (response) => {
          this.isStressed = response === 0 ? 'NO' : 'YES';
          this.freezeStatus.emit(false);
          this.isLoading = false;
          this.previousMessage = this.comment;
          this.tipIndex = 2;
        },
        (error) => {
          this.freezeStatus.emit(false);
          this.isLoading = false;
        }
      );
    } else {
      if (!this.isLoading) {
        window.alert('Hey, Cowboy, write how u feel first');
      } else {
        window.alert('Hold your horses, Cowboy');
      }
    }
  }

  public next() {
    this.tipIndex = 0;
    this.isStressed = undefined;
    this.comment = '';
  }

}

interface ApiBody {
  comment: string;
}