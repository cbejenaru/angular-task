import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2ImgurUploaderModule } from 'ng2-imgur-uploader';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PhotosComponent } from './photos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PhotosRoutingModule,
    ImageCropperModule,
    Ng2ImgurUploaderModule,
    Ng2ImgMaxModule,
    Ng2ImgurUploaderModule,
    TranslateModule,
    HttpClientModule,
    HttpModule,
  ],
  declarations: [PhotosComponent],
})
export class PhotosModule {}
