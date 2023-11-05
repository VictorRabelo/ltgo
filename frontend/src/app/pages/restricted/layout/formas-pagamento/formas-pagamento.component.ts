import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ControllerBase } from '@app/controller/controller.base';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubSink } from 'subsink';

import { Column } from '@app/models/Column';
import { MessageService } from '@app/services/message.service';
import { FormaPagamentoService } from '@app/services/forma-pagamento.service';

@Component({
  selector: 'app-formas-pagamento',
  templateUrl: './formas-pagamento.component.html',
  styleUrls: ['./formas-pagamento.component.css']
})
export class FormasPagamentoComponent extends ControllerBase {
  
  private sub = new SubSink();

  isLoading: boolean = false;

  dados: any = [];
  columns: Column[];

  title: string = 'Formas Pagamento';
  term: string;

  constructor(
    private router: Router,
    private service: FormaPagamentoService, 
    private message: MessageService,
    private spinner: NgxSpinnerService,
    private modalCtrl: NgbModal
  ) {
    super();
  }

  ngOnInit() {
    this.columns = [
      { field: 'id', header: '#ID', id: 'id', sortIcon: true, crud: false, mask: 'none' },
      { field: 'name', header: 'Maquininha', id: 'id', sortIcon: true, crud: false, mask: 'none' },
      { field: 'action', header: ' ', id: 'id', sortIcon: false, crud: true, mask: 'none' },
    ];
    // this.getAll();
  }

  openForm(){
    this.isLoading = true;
    this.service.store({}).subscribe(res => {
      if(res.message) {
        this.message.toastError(res.message);
        this.isLoading = false;
        return false;
      };

      this.router.navigate([`/restricted/formas-pagamento/${res.id}`]);
    }, error =>{
      this.isLoading = false;
      this.message.toastError(error.message)
      console.log(error)
    })
  }

  update(res: any) {
    this.router.navigate([`/restricted/formas-pagamento/${res.id}`]);
  }

  crudInTable(res: any){
    if(res.crud == 'delete'){
      this.delete(res.id)
    } else if(res.crud == 'cadastrar') {
      this.openForm();
    } else {
      this.update(res);
    }
  }

  getAll(){
    this.isLoading = true;
    this.sub.sink = this.service.getAll().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.dados = res;
      },error => console.log(error))
  }

  deleteConfirm(id: any) {
    this.message.swal.fire({
      title: 'Atenção!',
      icon: 'warning',
      html: `Deseja excluir essa Maquininha ? `,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Voltar',
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.delete(id);
      }
    })
  }

  delete(id: any, queryParams?: any) {
    this.isLoading = true;
    this.spinner.show();

    this.service.delete(id, queryParams).subscribe(res => {
      if (res.message) {
        this.message.toastSuccess(res.message)
      }
      this.getAll();
    },error =>{
      this.isLoading = false;
      this.message.toastError(error.message)
      console.log(error)
    }, () => {
      this.spinner.hide();
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}