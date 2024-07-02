import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommentNode} from '../model/comment-node.model';
import {faArrowUp, faShare} from '@fortawesome/free-solid-svg-icons';
import {CommonModule} from '@angular/common';
import {CommentComponent} from '../comment/comment.component';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentTreeComponent {
  @Input() commentNodes: CommentNode[] = [];
  @Input() commentLevel: number = 0;

  constructor() {
  }

  isMaxLevelReached(): boolean {
    return this.commentLevel >= 1;
  }

  protected readonly faShare = faShare;
}
