import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { Genre } from './entities/genre.entity';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOkResponse({ type: Genre, isArray: true })
  findAll() {
    return this.genresService.findAll();
  }
}
