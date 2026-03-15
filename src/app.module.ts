import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MovieModule } from './movies/movie.module';
import { GenresModule } from './genres/genres.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [PrismaModule, MovieModule, GenresModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
