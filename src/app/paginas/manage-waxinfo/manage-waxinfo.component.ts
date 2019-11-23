import { Component, OnInit } from '@angular/core';
import {WaxinfoService} from '../../services/waxinfo.service';
import { Waxinfo } from '../../models/waxinfo';
import { Location } from '@angular/common';


@Component({
  selector: 'app-manage-waxinfo',
  templateUrl: './manage-waxinfo.component.html',
  styleUrls: ['./manage-waxinfo.component.css']
})
export class ManageWaxinfoComponent implements OnInit {

  title = 'Manage Wax info';
  waxinfos: Waxinfo;
  error: string;

  constructor(private waxinfoService: WaxinfoService, private location: Location) { }

  ngOnInit() {
    this.waxinfoService.getWaxinfos().subscribe(
      (data: Waxinfo) => this.waxinfos = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.waxinfoService.deleteWaxinfo(+id).subscribe(
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
