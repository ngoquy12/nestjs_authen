import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ type: 'char', length: 36 })
  UserId: string;

  @Column({ type: 'varchar', length: 100 })
  UserName: string;

  @Column({ type: 'varchar', length: 100 })
  Email: string;

  @Column({ type: 'varchar', length: 100 })
  Password: string;

  @Column()
  Role: number;

  @Column()
  CreatedAt: Date;

  @Column()
  ModifiedAt: Date;

  @BeforeInsert()
  hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    // Gán lại giá trị mật khẩu mã hóa cho trường Password trước khi lưu vào db
    this.Password = bcrypt.hashSync(this.Password, salt);
  }
}
