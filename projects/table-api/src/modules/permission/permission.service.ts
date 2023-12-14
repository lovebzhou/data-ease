import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  create(createPermissionDto: CreatePermissionDto) {
    return this.permissionRepo.save(createPermissionDto);
  }

  findAll() {
    return this.permissionRepo.find();
  }

  findOne(id: number) {
    return this.permissionRepo.findOneBy({ id });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionRepo.findOneBy({ id });
    if (!permission) {
      throw new NotFoundException('权限不存在');
    }

    const newPermission = this.permissionRepo.merge(
      permission,
      updatePermissionDto,
    );

    return this.permissionRepo.save(newPermission);
  }

  async remove(id: number) {
    return this.permissionRepo.delete(id);
  }
}
