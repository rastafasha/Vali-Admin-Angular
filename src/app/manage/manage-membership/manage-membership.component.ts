import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { Page } from '../../models/page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-membership',
  templateUrl: './manage-membership.component.html',
  styleUrls: ['./manage-membership.component.css']
})
export class ManageMembershipComponent implements OnInit {

  title = 'Manage Pages';
  pages: Page;
  error: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private pageService: PageService, private location: Location) { }

  ngOnInit() {
    this.pageService.getPages().subscribe(
      (data: Page) => this.pages = data,
      error => this.error = error
    );
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
