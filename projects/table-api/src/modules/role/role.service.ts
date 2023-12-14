import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,

    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existRole = await this.roleRepo.findOneBy({
      code: createRoleDto.code,
      name: createRoleDto.name,
    });

    if (existRole) {
      throw new BadRequestException('角色已存在（角色名和角色编码不能重复）');
    }

    const role = this.roleRepo.create(createRoleDto);
    if (createRoleDto.permissionIds) {
      role.permissions = await this.permissionRepo.findBy({
        id: In(createRoleDto.permissionIds),
      });
    }

    return this.roleRepo.save(role);
  }

  findAll() {
    return this.roleRepo.find();
  }

  findOne(id: number) {
    return this.roleRepo.findOneBy({ id });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepo.findOneBy({ id });
    if (!role) {
      throw new NotFoundException();
    }

    const newRole = this.roleRepo.merge(role, updateRoleDto);

    return this.roleRepo.save(newRole);
  }

  remove(id: number) {
    return this.roleRepo.delete({ id });
  }
}
