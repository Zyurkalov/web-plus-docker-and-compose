import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { instanceToPlain } from 'class-transformer';
import { UserWishesDto } from './dto/user-wihes.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { hashValue } from 'src/common/helpers/hash';
import { SignupUserResponseDto } from 'src/auth/dto/signup-user-response.dto';
import { WishesService } from 'src/wishes/wishes.service';
import { MAP_ERRORS } from 'src/constants/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private wishSevice: WishesService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getAuthUserData(user: User): Promise<UserProfileResponseDto> {
    const currentUser = <UserProfileResponseDto>instanceToPlain(user);
    return currentUser;
    // instanceToPlain(user) - преобразует user, в нашем случае экземпляр User - в объект
    // <UserProfileResponseDto> указывает, какие типы должны быть извлечены из instanceToPlain(user)
  }

  async getUserByBody(query: string) {
    const user = await this.usersRepository.findOneOrFail({
      where: [{ username: query }, { email: query }],
    });
    return [user];
  }

  async getUserByQuery(query: FindManyOptions<User>): Promise<User> {
    return await this.usersRepository.findOneOrFail(query);
  }

  async getUserById(userId: number): Promise<User> {
    return await this.usersRepository.findOneOrFail({ where: { id: userId } });
  }

  async getUserByName(name: string): Promise<UserProfileResponseDto> {
    return await this.usersRepository.findOneOrFail({
      where: { username: name },
    });
  }

  async findUserWishes(name: string): Promise<UserWishesDto[]> {
    return await this.wishSevice.findWishesByUsername(name);
  }

  // async findAllUsersByQuery(query: FindManyOptions<User>): Promise<User[]> {
  //   return await this.usersRepository.find(query);
  // }

  async findUserByQuery(value: string, field = 'username'): Promise<User> {
    return await this.usersRepository.findOneOrFail({ where: { [field]: value } });
  }

  // для поиска внутри гардов, где вызывать ошибку "OrFail" не нужно
  async findUserByBody(name: string, mail: string) {
    return await this.usersRepository.findOne({
      where: [{ username: name }, { email: mail }],
    });
  }

  async findUserByFields(fields: Object[]) {
    return await this.usersRepository.findOne({
      where: fields,
    });
  }

  async findOwnWish(user: User): Promise<Wish[]> {
    return await this.wishSevice.findWishesByUsername(user.username);
  }

  private async handlePasswordUpdate(
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const { password } = updateUserDto;

    if (password) {
      updateUserDto.password = await hashValue(password);
    }
    return updateUserDto;
  }

  async update(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    const updatedUserDto = await this.handlePasswordUpdate(updateUserDto);
    const updatedFields: UpdateUserDto = {}
    let userExists = false

    for (const key in updatedUserDto) {
      if (updatedUserDto[key] !== undefined && updatedUserDto[key] !== user[key]) {
        updatedFields[key] = updatedUserDto[key]
      }
    }

    try {
      if (updatedFields.username !== undefined && updatedFields.username !== user.username) {
        userExists['username'] = await this.findUserByFields([{ username: updatedFields.username }]);
      }
      if (updatedFields.email !== undefined && updatedFields.email !== user.email) {
        userExists['email'] = await this.findUserByFields([{ email: updatedFields.email }]);
      }

      userExists = Object.keys(userExists).length > 0;
    } catch {
      throw new Error(MAP_ERRORS.default.message);
    }

    if (Object.keys(updatedFields).length && !userExists) {
      return await this.usersRepository.save({ ...user, ...updatedFields });
    } else {
      throw new Error(MAP_ERRORS.userAlreadyExists.message);
    }
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = await this.getUserByName(userData.username);
    if (!user) {
      return await this.usersRepository.save({ ...userData });
    }
  }

  async registration(
    createUserDto: CreateUserDto,
  ): Promise<SignupUserResponseDto> {
    const { password, ...userData } = createUserDto;
    const hash = await hashValue(password);
    const createUser: User = this.usersRepository.create({
      ...userData,
      password: hash,
    });
    const newUser = await this.usersRepository.save(createUser);
    console.log(newUser)
    return <SignupUserResponseDto>instanceToPlain(newUser);
  }

  //   async removeUser(
  //     userId: number,
  //   ): Promise<{ username: string; id: number; message: string }> {
  //     const { id, username } = await this.getUserByQuery({
  //       where: { id: userId },
  //     });

  //     if (!id || !username) {
  //       throw new Error('пользователь не найден');
  //     }
  //     try {
  //       await this.usersRepository.delete({ id });
  //       return { id, username, message: 'пользователь удален' };
  //     } catch (err) {
  //       throw new Error(`непредвиденная ошибка - ${err.message}`);
  //     }
  //   }
}
