import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ImageService {
  private supabase: SupabaseClient;
  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_KEY')
    );
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileName = `${Date.now()}-${file.originalname}`;

    // Chuyển đổi Buffer sang ArrayBuffer trước khi upload
    const arrayBuffer = file.buffer.buffer.slice(
      file.buffer.byteOffset,
      file.buffer.byteOffset + file.buffer.byteLength
    );

    const { data, error } = await this.supabase.storage
      .from('images') // Thư mục trong Supabase Storage
      .upload(fileName, arrayBuffer, { contentType: file.mimetype });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Trả về URL của ảnh đã upload
    return `${this.configService.get<string>('SUPABASE_URL')}/storage/v1/object/public/images/${fileName}`;
  }
  
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
