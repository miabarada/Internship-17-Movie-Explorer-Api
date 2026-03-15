import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiCreatedResponse({ description: 'New movie created', type: Movie })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  @ApiOkResponse({ type: Movie, isArray: true, description: 'All movies fetched with optional search, sort, genre filter' })
  findAll(
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('genre') genre?: string
  ) {
    return this.movieService.findAll({ search, sort, genre });
  }

  @Get(':id')
  @ApiOkResponse({ description: 'One movie fetched', type: Movie })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Movie updated', type: Movie })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto
  ) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Movie deleted' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.remove(id);
  }
}