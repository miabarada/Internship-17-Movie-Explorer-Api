import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(createFavoriteDto: CreateFavoriteDto, userId: number) {
    const existing = await this.prisma.favorite.findFirst({
      where: { userId, movieId: createFavoriteDto.movieId }
    })

    if (existing)
      throw new BadRequestException('Movie already in favorites')

    return this.prisma.favorite.create({
      data: {
        movieId: createFavoriteDto.movieId,
        userId: userId
      }
    });
  }

  findAll(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { movie: true }
    });
  }

  async remove(id: number, userId: number) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { 
        userId: userId,
        movieId: id
       }
    });

    if (!favorite) {
      throw new BadRequestException("Favorite not found or you don't have permission to delete it");
    }

    return this.prisma.favorite.delete({
      where: { id: favorite.id }
    });
  }
}
