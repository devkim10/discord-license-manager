import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { FindUniqueUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/find-unique-user.args';
import { CreateOneUserArgs } from 'src/@generated/prisma-nestjs-graphql/user/create-one-user.args';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUniqueUser(args: FindUniqueUserArgs): Promise<User | null> {
    return this.prisma.user.findUnique({
      ...args,
      include: { license: true },
    });
  }

  async createUser(args: CreateOneUserArgs): Promise<User> {
    return this.prisma.user.create({ ...args, include: { license: true } });
  }
}
