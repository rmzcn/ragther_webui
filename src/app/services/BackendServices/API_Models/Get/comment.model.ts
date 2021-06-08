import { UserInfoModelInner } from "./todo_get.model";

export class TodoCommentModel {
  id: number;
  todoId: number;
  userInfo: UserInfoModelInner;
  isOffer: boolean;
  offerStatus: number;
  content: string;
  createdAt: Date;
}
