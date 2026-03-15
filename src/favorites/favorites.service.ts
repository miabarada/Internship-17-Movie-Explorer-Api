import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  create(createFavoriteDto: CreateFavoriteDto) {
    return this.prisma.favorite.create({
      data: {
        movieId: createFavoriteDto.movieId
      }
    });
  }

  findAll() {
    return this.prisma.favorite.findMany({
      include: {
        movie: true
      }
    });
  }

  remove(id: number) {
    return this.prisma.favorite.delete({
      where: { id }
    });
  }
}
