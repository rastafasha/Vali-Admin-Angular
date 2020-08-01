import { Component, OnInit } from '@angular/core';
import { FinancingService } from '../../services/financing.service';
import { Financing } from '../../models/financing';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-financing',
  templateUrl: './manage-financing.component.html',
  styleUrls: ['./manage-financing.component.css']
})
export class ManageFinancingComponent implements OnInit {

  title = 'Manage Financing';
  financings: Financing;
  error: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private financingService: FinancingService, private location: Location) { }


  ngOnInit() {
    this.financingService.getFinancings().subscribe(
      (data: Financing) => this.financings = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.financingService.deleteFinancing(+id).subscribe(
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
