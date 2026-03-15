import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
   @ApiProperty()
   title: string;

   @ApiProperty()
   year: number;

   @ApiProperty()
   rating: number;

   @ApiProperty()
   description: string;

   @ApiProperty()
   posterUrl: string;

   @ApiProperty({ type: [Number], description: 'IDs of genres' })
   genreIds: number[];
}
