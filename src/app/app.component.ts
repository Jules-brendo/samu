import { Component, OnInit } from '@angular/core';

import {UF} from './types/uf';
import {UFService} from './services/uf.service'

import {Dados} from './types/samu';
import {SamuService} from './services/samu.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UFService, SamuService]
})
export class AppComponent implements OnInit {
    title = 'app';
    ufs : UF[];
    ID = 24;
    munAtendidos: Dados[] = [];
    meuUf: UF;
    dados_da_samu : Dados[];
    media: number = 0;

    constructor(private ufService: UFService, private samuService: SamuService)
    { }

    ngOnInit(): void {
        this.ufs = this.ufService.getAll();
        this.dados_da_samu = this.samuService.getAllMunicipiosAtendidosPorEstado();
        this.meuUf = this.meuUF();
       this.media = this.mediaDosMunicipios();
   }

   mediaDosMunicipios(): number {
     var numero_municipios = 0;
     var valor_total = 0;
     var Media = 0;
     for (let mun of this.dados_da_samu){
       if (mun.uf_id == this.ID){
         numero_municipios++;
         valor_total = mun.valor + valor_total;
         Media = valor_total/numero_municipios
         this.munAtendidos.push(mun);
       }}
       return Media;
   }
    meuUF(): UF {
     for (let uf of this.ufs) {
         if (uf.id == this.ID) return uf;
     }
   }
}
