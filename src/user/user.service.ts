import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async register(email: string, password: string) {
    if(!email)
      throw new BadRequestException("Missing 'email' field")

    if(!password)
      throw new BadRequestException("Missing 'password' field")

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    const payload = {
      id: user.id,
      email: user.email,
      role: 'user'
    }

    return {token: this.jwtService.sign(payload)}
  }
}
