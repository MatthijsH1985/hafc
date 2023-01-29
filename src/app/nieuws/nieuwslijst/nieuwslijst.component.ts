import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-nieuwslijst',
  templateUrl: './nieuwslijst.component.html',
  styleUrls: ['./nieuwslijst.component.scss']
})
export class NieuwslijstComponent {
  @Input('posts') posts: any;
}
