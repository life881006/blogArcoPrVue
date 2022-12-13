export type RoleType = '' | '*' | 'admin' | 'user';
// export interface UserState {
//   name?: string;
//   avatar?: string;
//   job?: string;
//   organization?: string;
//   location?: string;
//   email?: string;
//   introduction?: string;
//   personalWebsite?: string;
//   jobName?: string;
//   organizationName?: string;
//   locationName?: string;
//   phone?: string;
//   registrationDate?: string;
//   accountId?: string;
//   certification?: number;
//   role: RoleType;
// }

interface friend {
  id: string;
  userId?: string;
  friendUserId?: string;
  createTime?: string;
  nickName?: string;
}

export interface UserState {
  id: string;
  name?: string;
  nickName?: string;
  photo?: string;
  gender?: string;
  birthday?: string;
  phoneNumber?: string;
  hobbies?: string;
  friends?: Array<friend | []>;
  role: string;
}
