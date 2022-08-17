export interface CommentInterface {
  _id?: any;
  body: string;
  username: string;
  parentId: null | string;
  caseId: string;
  userId: string;
  date: Date;
}
