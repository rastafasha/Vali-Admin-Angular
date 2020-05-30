import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  serverUrl = environment.baseUrl;

  transform(img: string, tipo: string = 'usuario'): any {

    // tslint:disable-next-line:prefer-const
    let url = this.serverUrl + '/media/images/';

    if (!img ) {
      return url + '/user/';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {

      case 'usuario':
        url += '/user/' + img;
        break;

      default:
        console.log('tipo de imagen no existe, usuario');
        url += '/user/xxx';

    }

    return url;
  }

}
