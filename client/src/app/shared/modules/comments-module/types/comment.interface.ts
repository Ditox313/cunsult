export interface CommentInterface {
  _id?: any;
  body: string;
  username: string;
  userSecondName?: string;
  parentId: null | string;
  caseId: string;
  userId: string;
  date: Date;
  likes?: any;
  disLikes?: any;
  additionalLike?: any;
}
