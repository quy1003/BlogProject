import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private supabase:any;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_KEY')
    );
  }

  async uploadImage(file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const { data, error } = await this.supabase.storage
      .from('images') // Thư mục trong Supabase Storage
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (error) {
      throw new Error(error.message);
    }

    return `${this.configService.get<string>('SUPABASE_URL')}/storage/v1/object/public/images/${fileName}`;
  }
}
