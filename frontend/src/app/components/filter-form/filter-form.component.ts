import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {

  dados: any = {};
  loading: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  close(params = undefined) {
    this.activeModal.close(params);
  }

  submit(form: NgForm) {

    this.loading = true;

    this.dados.date = `${this.dados.ano}-${this.dados.mes}`;
    this.close(this.dados);
  }
}
