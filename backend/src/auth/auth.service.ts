import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/admins/admins.service';
import { Admin } from 'src/@generated/prisma-nestjs-graphql/admin/admin.model';
import { LoginAdminResponse } from 'src/auth/dto/login-admin.response';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<Admin | null> {
    const admin = await this.adminsService.findUniqueAdmin({
      where: { email: email },
    });

    if (admin && admin.password === password) {
      return admin;
    }

    return null;
  }

  async loginAdmin(admin: Admin): Promise<LoginAdminResponse> {
    const payload = { email: admin.email, sub: admin.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(licenseKey: string): Promise<User | null> {
    const user = await this.usersService.findUniqueUser({
      where: { licenseKey },
    });

    if (user) {
      return user;
    }

    return null;
  }

  async loginUser(args: LoginUserInput): Promise<User> {
    return this.usersService.findUniqueUser({
      where: { licenseKey: args.licenseKey },
    });
  }
}
