export class Todo {
  id: number;
  header: string;
  state: number;
  creationDate: string;
  creatorUserName: string;
  details: string;
  addedUserNames: string[];
  // comments: Comment[];
  tags: TodoTags[];

}

class TodoTags{
  tagName: string;
  tagID: string;
}

class Comment{
  id: number;
  authorUsername: string;
  comment: string;
  commentDate: string;
  userPhotoURL: string;
}
