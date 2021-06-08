export class UserDetailModel {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  profileImageURL: string;
  email: string;
  createdAt: Date;
  profileDetail: ProfileDetailModel;
}

export class ProfileDetailModel {
  profileDescription: string;
  hiddenProfileDescription: string;
  isHiddenProfile: boolean;
  profileScore: number;
  friendCount: number;
  helpCount: number;
}
