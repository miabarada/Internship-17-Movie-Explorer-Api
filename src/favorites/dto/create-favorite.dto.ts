import { ApiProperty } from "@nestjs/swagger";

export class CreateFavoriteDto {
   @ApiProperty()
   movieId: number
}
