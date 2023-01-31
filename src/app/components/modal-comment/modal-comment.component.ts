import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal-comment',
  templateUrl: './modal-comment.component.html',
  styleUrls: ['./modal-comment.component.scss']
})
export class ModalCommentComponent {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() modalStatus: boolean | undefined;
  @Input() callbackFunction: ((args: any) => void) | undefined;

  onCloseModal() {
    this.closeModal.emit(false);
  };

}
