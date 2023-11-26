export interface CommentModel {
  comment_id: number;
  comment_parent: number
  comment_author: string;
  comment_content: string;
  comment_date: Date
}
