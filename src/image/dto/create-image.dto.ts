import { IsNotEmpty, IsString, IsInt, IsUrl } from 'class-validator';

export class CreateImageDto {
  @IsUrl({}, { message: 'URL ảnh không hợp lệ' })
  @IsNotEmpty({ message: 'URL không được để trống' })
  url: string;

  @IsInt({ message: 'postId phải là số nguyên' })
  postId: number;
}
