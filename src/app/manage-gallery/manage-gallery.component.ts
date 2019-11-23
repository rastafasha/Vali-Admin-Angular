import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { Gallery } from '../models/gallery';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-gallery',
  templateUrl: './manage-gallery.component.html',
  styleUrls: ['./manage-gallery.component.css']
})
export class ManageGalleryComponent implements OnInit {

  title = 'Manage Gallery';
  gallerys: Gallery;
  error: string;

  constructor(private galleryService: GalleryService, private location: Location) { }

  ngOnInit() {
    this.galleryService.getGallerys().subscribe(
      (data: Gallery) => this.gallerys = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.galleryService.deleteGallery(+id).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => this.error = error
      );
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
