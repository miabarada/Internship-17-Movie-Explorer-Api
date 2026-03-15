import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from './entities/movie.entity';

interface FindAllQuery {
  search?: string;
  sort?: string;
  genre?: string;
}

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { genreIds, ...movieData } = createMovieDto;

    return this.prisma.movie.create({
      data: {
        ...movieData,
        genres: {
          connect: genreIds.map(id => ({ id })),
        },
      },
      include: { genres: true },
    });
  }

  findAll(query: FindAllQuery) {
    const { search, sort, genre } = query;

    return this.prisma.movie.findMany({
      where: {
        title: search ? { contains: search, mode: 'insensitive' } : undefined,
        genres: genre
          ? { some: { name: { equals: genre, mode: 'insensitive' } } }
          : undefined,
      },
      include: { genres: true },
      orderBy: sort ? { [sort]: 'desc' } : undefined,
    });
  }

  findOne(id: number) {
    return this.prisma.movie.findUnique({
      where: { id },
      include: { genres: true },
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
      include: { genres: true },
    });
  }

  remove(id: number) {
    return this.prisma.movie.delete({
      where: { id },
    });
  }
}