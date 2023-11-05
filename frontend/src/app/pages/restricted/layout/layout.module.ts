import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from "./layout.component";
import { ComponentsModule } from '@app/components/components.module';
import { UtilModule } from '@app/util/util.module';

// Directive
import { SortDirective } from '@app/directive/sort.directive';

// Components Layout
import { NavTopComponent } from "./nav-top/nav-top.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from './footer/footer.component';

// Components
import { EstoqueComponent } from './estoque/estoque.component';
import { UsersComponent } from './users/users.component';
import { EntregasDespesasComponent } from './entregas/entregas-despesas/entregas-despesas.component';
import { FormasPagamentoComponent } from './formas-pagamento/formas-pagamento.component';
import { FormasPagamentoDetalheComponent } from './formas-pagamento/formas-pagamento-detalhe/formas-pagamento-detalhe.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SalesComponent } from './sales/sales.component';
import { SaleDetalheComponent } from './sales/sale-detalhe/sale-detalhe.component';
import { SaleFinishComponent } from './sales/sale-detalhe/sale-finish/sale-finish.component';
import { EntregasComponent } from './entregas/entregas.component';
import { EntregaDetalheComponent } from './entregas/entrega-detalhe/entrega-detalhe.component';
import { CaixaComponent } from './caixa/caixa.component';

// PrimeNG
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { AccordionModule } from 'primeng/accordion';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { NgxIziToastModule } from 'ngx-izitoast';
import { DataTablesModule } from 'angular-datatables';
import { NgbDropdownModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng-lts/api';
 
export const customCurrencyMaskConfig = {
    align: "left",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: null,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
};
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    UtilModule,
    ToastModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    FileUploadModule,
    RippleModule,
    AccordionModule,
    AutocompleteLibModule,
    Ng2SearchPipeModule,
    NgxIziToastModule,
    DataTablesModule,
    NgbPaginationModule,
    NgbModule,
    NgbDropdownModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgxMaskModule.forRoot()

  ],
  declarations: [
    LayoutComponent,
    HomeComponent,
    NavTopComponent,
    SidebarComponent,
    FooterComponent,
    SortDirective,
    SalesComponent,
    SaleDetalheComponent,
    SaleFinishComponent,
    EstoqueComponent,
    ClientesComponent,
    UsersComponent,
    RelatoriosComponent,
    FornecedoresComponent,
    CategoriasComponent,
    EntregasComponent,
    EntregaDetalheComponent,
    EntregasDespesasComponent,
    CaixaComponent,
    FormasPagamentoComponent,
    FormasPagamentoDetalheComponent

  ],
  entryComponents: [
    SaleFinishComponent,
  ],
  exports:[
    LayoutComponent,
    HomeComponent,
    NavTopComponent,
    SidebarComponent,
    FooterComponent
  ],
  providers: [
    MessageService,
  ]
})
export class LayoutModule { }