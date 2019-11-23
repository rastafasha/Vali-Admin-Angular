import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../services/publicacion.service';
import { Publicacion } from '../models/publicacion';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-special',
  templateUrl: './manage-special.component.html',
  styleUrls: ['./manage-special.component.css']
})
export class ManageSpecialComponent implements OnInit {

  title = 'Manage Special Posts';
  publicacions: Publicacion;
  error: string;

  constructor(private publicacionService: PublicacionService, private location: Location) { }

  ngOnInit() {
    this.publicacionService.getPublicacions().subscribe(
      (data: Publicacion) => this.publicacions = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.publicacionService.deletePublicacion(+id).subscribe(
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
