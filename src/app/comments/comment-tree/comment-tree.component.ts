import {Component, Input} from '@angular/core';
import {CommentNode} from '../model/comment-node.model';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss']
})
export class CommentTreeComponent {
  @Input() commentNodes: CommentNode[] = [];
  @Input() isAuthenticated: boolean = false;
}
