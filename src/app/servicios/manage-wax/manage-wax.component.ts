import { Component, OnInit } from '@angular/core';
import { WaxService } from '../../services/wax.service';
import { Wax } from '../../models/wax';
import { Location } from '@angular/common';
import {PaginatePipe, PaginationService} from 'ng2-pagination';


@Component({
  selector: 'app-manage-wax',
  templateUrl: './manage-wax.component.html',
  styleUrls: ['./manage-wax.component.css']
})
export class ManageWaxComponent implements OnInit {

  title = 'Manage Wax';
  waxs: Wax;
  error: string;
  data:string;

  p: Number = 1;
  count: Number = 5;

  constructor(private waxService: WaxService, private location: Location) { }

  ngOnInit() {
    this.waxService.getWaxs().subscribe(
      (data: Wax) => this.waxs = data,
      error => this.error = error
    );
    
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.waxService.deleteWax(+id).subscribe(
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
