export class CommentNode {
  comment: any;
  children: CommentNode[] = [];
  level: number = 0

  constructor(comment: any, level: number = 0) {
    this.comment = comment;
    this.level = level;
  }
}

export interface CommentNodeInterface {
  comment?: any;
  children?: CommentNodeInterface[];
}
