import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-nieuwslijst',
  templateUrl: './nieuwslijst.component.html',
  styleUrls: ['./nieuwslijst.component.scss']
})
export class NieuwslijstComponent {
  @Input('posts') posts: any;
  @Input('pagination') pagination: boolean = true;
  @Input('compact') compact: boolean = false;
  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }
}
