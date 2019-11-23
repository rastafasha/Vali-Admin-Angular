import { Component, OnInit } from '@angular/core';
import { SubcriptoreService } from '../services/subcriptores.service';
import { Subcriptore } from '../models/subcriptore';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-registros',
  templateUrl: './manage-registros.component.html',
  styleUrls: ['./manage-registros.component.css']
})
export class ManageRegistrosComponent implements OnInit {

  title = 'Manage Subcribers';
  subcriptores: Subcriptore;
  error: string;

  constructor(private subcriptoreService: SubcriptoreService, private location: Location) { }

  ngOnInit() {
    this.subcriptoreService.getSubcriptores().subscribe(
      (data: Subcriptore) => this.subcriptores = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.subcriptoreService.deleteSubcriptore(+id).subscribe(
        res => {
          // console.log(res);
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
