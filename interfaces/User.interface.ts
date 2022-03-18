interface User {
  id?: string;
  username: string;
  personalName?: string;
  mail?: string;
  password: string;
  confirmPassword?: string;
  expertizeTech?: string;
  interestedTech?: string;
  description?: string;
  institution?: string;
  gender?: string;
  languages?: string;
  phone?: string;
  address?: string;
}

export default User;
