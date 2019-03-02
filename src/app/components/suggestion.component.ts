import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'suggestion',
  template:
  `<div class="row">
    <div class="col-xs-9">
        <label>Location: </label>
        <input class="form-control" [(ngModel)]="location" />
    </div>
    <div class="col-xs-3">
        <button type="button" class="btn btn-default" style="margin-top: 25px;" (click)="suggest(counter)">Suggest</button>
    </div>
  </div>
  `
})

export class SuggestionComponent {
    public location: string = "Nashville";
    public counter: number = 0;

    public suggest(){
        console.log(this.location + " " + this.counter);
        this.counter += 1;
    }
}
