import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  content: string;

  @IsInt({ message: 'categoryId phải là số nguyên' })
  categoryId: number;
}