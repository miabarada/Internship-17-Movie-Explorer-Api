import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  create(createMovieDto: CreateMovieDto) {
    const { genreIds, ...movieData } = createMovieDto;

    return this.prisma.movie.create({
      data: {
        ...movieData,
        genres: {
          connect: genreIds.map(id => ({ id })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.movie.findMany({
      include: {
        genres: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.movie.findUnique({
      where: { id },
      include: {
        genres: true,
      },
    });
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    const { genreIds, ...movieData } = updateMovieDto;

    return this.prisma.movie.update({
      where: { id },
      data: {
        ...movieData,
        ...(genreIds && {
          genres: {
            set: genreIds.map(id => ({ id })),
          },
        }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.movie.delete({
      where: { id },
    });
  }
}
