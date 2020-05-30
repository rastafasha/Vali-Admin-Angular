import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Modal } from '../../models/modal';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-modal',
  templateUrl: './manage-modal.component.html',
  styleUrls: ['./manage-modal.component.css']
})
export class ManageModalComponent implements OnInit {

  title = 'Manage Modal Home: at start';
  modals: Modal;
  error: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private modalService: ModalService, private location: Location) { }

  ngOnInit() {
    this.modalService.getModals().subscribe(
      (data: Modal) => this.modals = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.modalService.deleteModal(+id).subscribe(
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
