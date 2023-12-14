import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const exist = this.permissionRepo.findOneBy({
      code: createPermissionDto.code,
      name: createPermissionDto.name,
    });

    if (exist) {
      throw new BadRequestException('权限已存在（权限名和权限编码不能重复）');
    }

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
