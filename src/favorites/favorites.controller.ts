import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Favorite } from './entities/favorite.entity';
import { UserAuthGuard } from 'src/user/user-auth.guard';

@Controller('favorites')
@UseGuards(UserAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiCreatedResponse({ type: Favorite })
  create(@Body() createFavoriteDto: CreateFavoriteDto, @Request() req) {
    const userId = req.user.id
    return this.favoritesService.create(createFavoriteDto, userId);
  }

  @Get()
  @ApiOkResponse({ type: Favorite, isArray: true })
  findAll(@Request() req) {
    const userId = req.user.id
    return this.favoritesService.findAll(userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string, @Request() req) {
    const userId = req.user.id
    return this.favoritesService.remove(+id, userId);
  }
}
