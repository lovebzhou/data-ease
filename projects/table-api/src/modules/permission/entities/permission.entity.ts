import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'permissions',
})
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
    comment: '权限代码',
  })
  code: string;

  @Column({
    length: 30,
    comment: '权限名称',
  })
  name: string;
}
