import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên thể loại không được để trống' })
  name: string;
}
