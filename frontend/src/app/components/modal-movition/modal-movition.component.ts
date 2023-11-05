import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '@app/services/crud.service';
import { MessageService } from '@app/services/message.service';
import { MovitionService } from '@app/services/movition.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-modal-movition',
  templateUrl: './modal-movition.component.html',
  styleUrls: ['./modal-movition.component.css']
})
export class ModalMovitionComponent implements OnInit, OnDestroy {

  private sub = new SubSink();

  loading: boolean = false;

  @Input() type: string;

  dados: any = {};

  tiposCaixas: any[] = [];
  validCaixass: boolean = true;

  constructor(
    private activeModal: NgbActiveModal,
    private service: MovitionService,
    private message: MessageService,
  ) {}

  ngOnInit(): void {
    this.getTiposCaixas();

    this.dados.status = this.type;
  }

  close(params = undefined) {
    this.activeModal.close(params);
  }

  submit(form: NgForm) {
    if (!form.valid) return false;
    
    this.loading = true;
    
    if(this.dados.caixa) this.dados.status = this.dados.caixa;

    this.service.store(this.dados).subscribe(
      (res: any) => {
        this.message.toastSuccess("Movimentação bem sucedida!")
        this.close(true);
      },
      error => {
        this.loading = false;
        console.log(error)
      }
    );
  }

  getTiposCaixas() {
    this.service.getAllItem().subscribe(res => {
      this.tiposCaixas = res;
    },error =>console.log(error));
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
