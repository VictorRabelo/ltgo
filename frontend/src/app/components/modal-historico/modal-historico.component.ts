import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubSink } from 'subsink';
import { VendaService } from '@app/services/venda.service';
import { MessageService } from '@app/services/message.service';

@Component({
  selector: 'app-modal-historico',
  templateUrl: './modal-historico.component.html',
  styleUrls: ['./modal-historico.component.css']
})
export class ModalHistoricoComponent implements OnInit, OnDestroy {

  private sub = new SubSink();

  loading: boolean = false;

  @Input() id: any;

  dados: any = {};
  title: string;

  constructor(
    private activeModal: NgbActiveModal,
    private service: VendaService,
    private message: MessageService,
  ) {}

  ngOnInit() {
    if(this.id){
      
    }
  }

  close(params = undefined) {
    this.activeModal.close(params);
  }
  
  submit(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    
    this.loading = true;

    const dados = {
      debitar: true,
      creditar: this.dados.debitar,
      restante: this.dados.restante,
      pago: this.dados.pago,
      cliente: this.dados.cliente,
      caixa: this.dados.caixa,
    }

    this.service.update(this.dados.id_venda, dados).subscribe(res => {
      this.close(true);
    }, error => {
      console.log(error)
      this.message.toastError(error.message);
      this.loading = false;
    }, () => {
      this.loading = false;
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
