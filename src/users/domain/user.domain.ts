// src/users/domain/entities/user.entity.ts

export interface UserRepository{
    get(id: string): User
}
export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
    changeEmail(email: string): void {
       this.email=email;
       this.update();
    }

    update(): void {
        this.updatedAt = new Date();
    }

  }
  

