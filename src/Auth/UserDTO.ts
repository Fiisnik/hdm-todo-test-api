export default class UserDTO {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  
    constructor(partial: Partial<UserDTO>) {
      Object.assign(this, partial);
    }
  }
  