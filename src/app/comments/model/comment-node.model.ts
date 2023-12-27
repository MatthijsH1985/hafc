export class CommentNode {
  comment: any;
  children: CommentNode[] = [];

  constructor(comment: any) {
    this.comment = comment;
  }
}

export interface CommentNodeInterface {
  comment?: any;
  children?: CommentNodeInterface[];
}
