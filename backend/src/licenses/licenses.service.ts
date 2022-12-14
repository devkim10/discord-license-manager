import { Injectable } from '@nestjs/common';
import { FindUniqueLicenseArgs } from '../@generated/prisma-nestjs-graphql/license/find-unique-license.args';
import { PrismaService } from '../prisma.service';
import { License } from '../@generated/prisma-nestjs-graphql/license/license.model';
import { FindManyLicenseArgs } from '../@generated/prisma-nestjs-graphql/license/find-many-license.args';
import { CreateOneLicenseArgs } from '../@generated/prisma-nestjs-graphql/license/create-one-license.args';
import { UpdateOneLicenseArgs } from '../@generated/prisma-nestjs-graphql/license/update-one-license.args';
import { CreateManyLicenseArgs } from '../@generated/prisma-nestjs-graphql/license/create-many-license.args';
import { DeleteManyLicenseArgs } from '../@generated/prisma-nestjs-graphql/license/delete-many-license.args';
import { AffectedRows } from '../@generated/prisma-nestjs-graphql/prisma/affected-rows.output';

@Injectable()
export class LicensesService {
  constructor(private readonly prisma: PrismaService) {}

  async findUniqueLicense(args: FindUniqueLicenseArgs): Promise<License> {
    return this.prisma.license.findUnique(args);
  }

  async findManyLicense(args: FindManyLicenseArgs): Promise<License[]> {
    return this.prisma.license.findMany(args);
  }

  async createLicense(args: CreateOneLicenseArgs): Promise<License> {
    return this.prisma.license.create(args);
  }

  async updateOneLicense(args: UpdateOneLicenseArgs): Promise<License> {
    return this.prisma.license.update(args);
  }

  async createManyLicense(args: CreateManyLicenseArgs): Promise<AffectedRows> {
    return this.prisma.license.createMany(args);
  }

  async deleteManyLicense(args: DeleteManyLicenseArgs): Promise<AffectedRows> {
    return this.prisma.license.deleteMany(args);
  }

  async totalLicenses(): Promise<number> {
    return this.prisma.license.count();
  }
}
