import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubSink } from 'subsink';
import { VendaService } from '@app/services/venda.service';
import { MessageService } from '@app/services/message.service';
import { HistoricoService } from '@app/services/historico.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-invoice',
  templateUrl: './modal-invoice.component.html',
  styleUrls: ['./modal-invoice.component.css']
})
export class ModalInvoiceComponent implements OnInit, OnDestroy {
  @ViewChild('inputProduto', {static: false}) inputProduto: ElementRef;

  private sub = new SubSink();

  loading: boolean = false;

  @Input() id: any;

  dados: any = {};
  title: string;

  constructor(
    private activeModal: NgbActiveModal,
    private service: HistoricoService,
    private message: MessageService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    if(this.id){
      
    }
  }

  close(params = undefined) {
    this.activeModal.close(params);
  }
  
  handleFileInput(files: FileList) {
    
    if (files.length > 0) {
      this.dados.fileInvoice = files[0]
      let reader = new FileReader();
      reader.readAsDataURL(this.dados.file);
      reader.onload = e => {
        let img =  reader.result as string;
        this.dados.invoice_path = this.sanitizer.bypassSecurityTrustResourceUrl(img);
        this.dados.fileInvoice = img;
      }
    }
  
  }
  
  openPhotoPicker() {
    this.inputProduto.nativeElement.click();
  }

  submit(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    
    this.loading = true;

    // this.service.update(this.dados.id_venda, dados).subscribe(res => {
    //   this.close(true);
    // }, error => {
    //   console.log(error)
    //   this.message.toastError(error.message);
    //   this.loading = false;
    // }, () => {
    //   this.loading = false;
    // });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
