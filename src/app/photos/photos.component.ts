import {Component, OnInit} from '@angular/core';
import {Ng2ImgMaxService} from 'ng2-img-max';
import {Ng2ImgurUploader} from 'ng2-imgur-uploader';
import {NavigationService} from '../navigation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css', '../app.component.css']
})
export class PhotosComponent implements OnInit {
  miniatureImageLoaded = false;
  miniatureImageChangedEvent: any = '';
  miniatureCroppedImage: any = '';
  miniatureSaved = false;
  miniatureURL = '';


  bannerImageLoaded = false;
  bannerImageChangedEvent: any = '';
  bannerCroppedImage: any = '';
  bannerSaved = false;
  bannerURL = '';

  galleryImageLoaded = false;
  galleryImageChangedEvent: any = '';
  galleryCroppedImage: any = '';
  gallerySaved = false;
  galleryURLs: string[] = [];


  constructor(private imageCompressService: Ng2ImgMaxService,
              private imgurUploader: Ng2ImgurUploader,
              private navService: NavigationService,
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('step4') !== null) {
      let stored = JSON.parse(localStorage.getItem('step4'));
      if (stored.miniatureURL !== '') {
        this.miniatureURL = stored.miniatureURL;
        this.miniatureSaved = true;
        this.miniatureImageLoaded = true;
      }
      if (stored.bannerURL !== '') {
        this.bannerURL = stored.bannerURL;
        this.bannerSaved = true;
        this.bannerImageLoaded = true;
      }
      this.galleryURLs = stored.galleryURLs;
    }
  }

  onRemove(type: string) {
    if (type === 'miniature') {
      this.miniatureCroppedImage = '';
      this.miniatureImageChangedEvent = null;
      this.miniatureImageLoaded = false;
      this.miniatureSaved = false;
      this.miniatureURL = '';
    } else if (type === 'banner') {
      this.bannerCroppedImage = '';
      this.bannerImageChangedEvent = null;
      this.bannerImageLoaded = false;
      this.bannerSaved = false;
      this.bannerURL = '';
    } else if (type === 'gallery') {
      this.galleryCroppedImage = '';
      this.galleryImageChangedEvent = null;
      this.galleryImageLoaded = false;
      this.gallerySaved = false;
    }
  }

  onSave(type: string) {
    if (type === 'miniature') {
      const originalSize = 4 * (this.miniatureCroppedImage.length / 3) / 1024;
      if (originalSize > 1024) {
        this.imageCompressService
          .compress([this.dataUrlToFile(this.miniatureCroppedImage, 'miniature.png')], 1)
          .subscribe((compressResult) => {
            this.imgurUploader.upload({
              clientId: '980744b29c8c9cc',
              imageData: compressResult
            }).subscribe((result) => {
              this.miniatureURL = result.data.link;
              this.miniatureSaved = true;
            });
          });
      } else {
        this.imgurUploader.upload({
          clientId: '980744b29c8c9cc',
          imageData: this.dataUrlToFile(this.miniatureCroppedImage, 'miniature.png')
        }).subscribe((result) => {
          this.miniatureURL = result.data.link;
          this.miniatureSaved = true;
        });
      }
    } else if (type === 'banner') {
      const originalSize = 4 * (this.bannerCroppedImage.length / 3) / 1024;
      if (originalSize > 1024) {
        this.imageCompressService
          .compress([this.dataUrlToFile(this.bannerCroppedImage, 'banner.png')], 1)
          .subscribe((compressResult) => {
            this.imgurUploader.upload({
              clientId: '980744b29c8c9cc',
              imageData: compressResult
            }).subscribe((result) => {
              this.bannerURL = result.data.link;
              this.bannerSaved = true;
            });
          });
      } else {
        this.imgurUploader.upload({
          clientId: '980744b29c8c9cc',
          imageData: this.dataUrlToFile(this.bannerCroppedImage, 'banner.png')
        }).subscribe((result) => {
          this.bannerURL = result.data.link;
          this.bannerSaved = true;
        });
      }
    } else if (type === 'gallery') {
      const originalSize = 4 * (this.galleryCroppedImage.length / 3) / 1024;
      if (originalSize > 1024) {
        this.imageCompressService
          .compress([this.dataUrlToFile(this.galleryCroppedImage, 'gallery.png')], 1)
          .subscribe((compressResult) => {
            this.imgurUploader.upload({
              clientId: '980744b29c8c9cc',
              imageData: compressResult
            }).subscribe((result) => {
              this.galleryURLs.push(result.data.link);
              this.gallerySaved = true;
              this.onRemove('gallery');
            });
          });
      } else {
        this.imgurUploader.upload({
          clientId: '980744b29c8c9cc',
          imageData: this.dataUrlToFile(this.galleryCroppedImage, 'gallery.png')
        }).subscribe((result) => {
          this.galleryURLs.push(result.data.link);
          this.gallerySaved = true;
          this.onRemove('gallery');
        });
      }

      // this.onRemove('gallery');

    }
  }

  fileChangeEvent(event: any, type: string): void {
    if (type === 'miniature') {
      this.miniatureImageChangedEvent = event;
      this.miniatureImageLoaded = true;
    } else if (type === 'banner') {
      this.bannerImageChangedEvent = event;
      this.bannerImageLoaded = true;
    } else if (type === 'gallery') {
      this.galleryImageChangedEvent = event;
      this.galleryImageLoaded = true;
    }
  }

  imageCropped(image: string, type: string) {
    if (type === 'miniature') {
      this.miniatureCroppedImage = image;
    } else if (type === 'banner') {
      this.bannerCroppedImage = image;
    } else if (type === 'gallery') {
      this.galleryCroppedImage = image;
    }
  }

  dataUrlToFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  makeId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  onGalleryClose(index: number) {
    this.galleryURLs.splice(index, 1);
  }

  onImageLoaded() {
  }


  loadImageFailed() {

  }

  onBack() {
    this.router.navigate(['step', --this.navService.currentStep]);
  }

  onCancel() {
    this.onRemove('miniature');
    this.onRemove('banner');
    this.onRemove('gallery');
    this.galleryURLs = [];
  }

  onNext() {
    const photosObject = {
      miniatureURL: this.miniatureURL,
      bannerURL: this.bannerURL,
      galleryURLs: this.galleryURLs
    };
    localStorage.setItem('step4', JSON.stringify(photosObject));
    this.router.navigate(['step', ++this.navService.currentStep]);
  }
}
