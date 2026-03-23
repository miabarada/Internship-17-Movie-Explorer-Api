import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';
import { AdminAuthGuard } from 'src/user/admin-auth.guard';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiCreatedResponse({ description: 'New movie created', type: Movie })
  @UseGuards(AdminAuthGuard)
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
  @UseGuards(AdminAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto
  ) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Movie deleted' })
  @UseGuards(AdminAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.remove(id);
  }
}