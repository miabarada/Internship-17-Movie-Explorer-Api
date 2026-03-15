import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService
   extends PrismaClient
   implements OnModuleInit, OnModuleDestroy
{
  constructor() {
   const adapter = new PrismaPg({
      user: 'postgres',
      host: 'localhost',
      database: 'movies',
      password: 'mypassword',
      port: 5432,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
