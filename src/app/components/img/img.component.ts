import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {
  
  img = '';

  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
  }
  @Output() loaded = new EventEmitter<string>();
  imageDefault = "./assets/images/nodisponible.png";

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    //console.log("log hijo");
    this.loaded.emit(this.img);
  }

}
