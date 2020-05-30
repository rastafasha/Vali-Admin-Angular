import { Component, OnInit } from '@angular/core';
import { ClasesService } from '../../services/clases.service';
import { Clases } from '../../models/clases';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-clases',
  templateUrl: './manage-clases.component.html',
  styleUrls: ['./manage-clases.component.css']
})
export class ManageClasesComponent implements OnInit {

  title = 'Manage Clases';
  clasess: Clases;
  error: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private clasesService: ClasesService, private location: Location) { }

  ngOnInit() {
    this.clasesService.getClasess().subscribe(
      (data: Clases) => this.clasess = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.clasesService.deleteClases(+id).subscribe(
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
