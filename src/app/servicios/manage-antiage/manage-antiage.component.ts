import { Component, OnInit } from '@angular/core';
import { AntiageService } from '../../services/antiage.service';
import { Antiage } from '../../models/antiage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-antiage',
  templateUrl: './manage-antiage.component.html',
  styleUrls: ['./manage-antiage.component.css']
})
export class ManageAntiageComponent implements OnInit {

  title = 'Manage Financing';
  antiages: Antiage;
  error: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private antiageService: AntiageService, private location: Location) { }

  ngOnInit() {
    this.antiageService.getAntiages().subscribe(
      (data: Antiage) => this.antiages = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.antiageService.deleteAntiage(+id).subscribe(
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
