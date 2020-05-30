import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-share-this',
  templateUrl: './share-this.component.html',
  styleUrls: ['./share-this.component.css']
})
export class ShareThisComponent implements OnInit  {

  serverUrl = environment.baseUrl;

  @ViewChild('shareThisDiv') shareThisDiv: ElementRef;
  shareThisUrl = "UrlNotSet";

  constructor(private galleryService: GalleryService) {
     // Subscribe to pageChange events - build and set new url
     galleryService.pageChange$.subscribe(newPage => {
      console.log('shareThis.pageChangeSubscription - newPage: ' + newPage)

      let url = this.buildUrl();
      this.setUrl(url);
    });
  }

  ngOnInit() {
    let url = this.buildUrl();
    this.setUrl(url);
    console.log('shareThis - ngOnInit - adding url: ' + url);
  }

  
  buildUrl(): string {
    console.log('shareThis.buildUrl - page name: ' + this.galleryService.pageName);
    
    let url = 'http://test.resourceAnalytix.com';
    url += '/' + this.galleryService.serverUrl;
    url += '/' + this.galleryService.pageName;
    url += '?' + 'marketAreaID=' + this.galleryService.marketAreaID;
    url += '&' + 'propertyTypeID=' + this.galleryService.propertyTypeID;
    this.shareThisUrl = url;

    return url;
  }

  setUrl(urlIn: string) {
    console.log('shareThis.setUrl - url: ' + urlIn);

    //debugger;

    let x = window['__sharethis__'];
    if (x == null)
      console.log('sharethis.setUrl - shareThis not in window');
    else
      console.log('sharethis.setUrl - shareThis is defined in window');

    // !!! Update ShareThis url HERE
    if (x != null) {
      console.log('sharethis.setUrl - setting url');
      //window.__sharethis__.load('inline-share-buttons', {
      window['__sharethis__'].load('inline-share-buttons', {
        url: urlIn
      });
    } else {
       console.log('sharethis.setUrl - unable to set url');     
    }
  }

}
