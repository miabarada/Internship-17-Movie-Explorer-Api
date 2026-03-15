import { ApiProperty } from "@nestjs/swagger";

export class Movie {
   @ApiProperty()
   id: number;

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
}
