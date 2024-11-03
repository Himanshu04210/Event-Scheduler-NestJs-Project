import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    user.createdDate = new Date();
    user.modifiedDate = new Date();
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({where: {id}});
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({where: {email}});
  }

  async update(id: number, updateUserDto: UpdateUserDto){
    const existingUser: User =  await this.findOne(id);
    existingUser.name = updateUserDto.name;
    existingUser.email = updateUserDto.email;
    existingUser.modifiedDate = new Date();
    return this.userRepository.save(existingUser);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
