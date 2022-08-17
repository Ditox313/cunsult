import { ActiveCommentTypeEnum } from './activeCommentType.enum';

export interface ActiveCommentInterface {
  _id: string;
  type: ActiveCommentTypeEnum;
}
