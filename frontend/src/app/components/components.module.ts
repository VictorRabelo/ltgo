import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';

import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { EstoqueFormComponent } from './estoque-form/estoque-form.component';
import { ModalPessoalComponent } from './modal-pessoal/modal-pessoal.component';
import { ModalProductsComponent } from './modal-products/modal-products.component';
import { ModalProductDadosComponent } from './modal-product-dados/modal-product-dados.component';
import { ModalDebitarComponent } from './modal-debitar/modal-debitar.component';
import { ModalDolarFormComponent } from './modal-dolar-form/modal-dolar-form.component';
import { ModalAlterPasswordComponent } from './modal-alter-password/modal-alter-password.component';
import { ModalInvoiceComponent } from './modal-invoice/modal-invoice.component';
import { ModalHistoricoComponent } from './modal-historico/modal-historico.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { TimerComponent } from './timer/timer.component';
import { FormaPagamentoFormComponent } from './forma-pagamento-form/forma-pagamento-form.component';
import { ModalMovitionComponent } from './modal-movition/modal-movition.component';

import { UtilModule } from '@app/util/util.module';

import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: false,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    ClienteFormComponent,
    EstoqueFormComponent,
    ModalPessoalComponent,
    ModalProductsComponent,
    ModalProductDadosComponent,
    ModalDebitarComponent,
    ModalMovitionComponent,
    ModalDolarFormComponent,
    ModalAlterPasswordComponent,
    ModalInvoiceComponent,
    ModalHistoricoComponent,
    FilterFormComponent,
    TimerComponent,
    FormaPagamentoFormComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilModule,
    MatTabsModule,
    Ng2SearchPipeModule,
    MatStepperModule,
    NgxMaskModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  exports:[
    ClienteFormComponent,
    EstoqueFormComponent,
    ModalPessoalComponent,
    ModalProductsComponent,
    ModalProductDadosComponent,
    ModalDebitarComponent,
    ModalMovitionComponent,
    ModalDolarFormComponent,
    ModalAlterPasswordComponent,
    ModalInvoiceComponent,
    ModalHistoricoComponent,
    FilterFormComponent,
    TimerComponent,
    FormaPagamentoFormComponent,

  ],
  entryComponents: [
    ClienteFormComponent,
    EstoqueFormComponent,
    ModalPessoalComponent,
    ModalProductsComponent,
    ModalProductDadosComponent,
    ModalDebitarComponent,
    ModalMovitionComponent,
    ModalDolarFormComponent,
    ModalAlterPasswordComponent,
    ModalInvoiceComponent,
    ModalHistoricoComponent,
    FilterFormComponent,
    TimerComponent,
    FormaPagamentoFormComponent,

  ],
})
export class ComponentsModule { }
