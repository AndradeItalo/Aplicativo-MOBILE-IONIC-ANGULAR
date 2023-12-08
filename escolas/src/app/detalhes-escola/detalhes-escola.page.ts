import { Component, OnInit } from '@angular/core';
import { EscolaDataService } from '../escola-data.service';

interface MapeamentoDeRotulos {
  [key: string]: string;
}

@Component({
  selector: 'app-detalhes-escola',
  templateUrl: './detalhes-escola.page.html',
  styleUrls: ['./detalhes-escola.page.scss'],
})

export class DetalhesEscolaPage implements OnInit {
  escola: any; // Armazena os detalhes da escola selecionada.'
  escolaDetalhes: any; // Armazena os detalhes da escola formatados para exibição.

  // Define os grupos de informações
  categoriasDeInformacoes: any[] = [
    {
      titulo: 'Informações Gerais',
      detalhes: [
        { label: 'Ano do Censo', valor: 'nuAnoCenso' },
        { label: 'Código da Escola', valor: 'coEntidade' },
        { label: 'Tipo de Dependência', valor: 'tpDependencia' },
        { label: 'Rede de Ensino', valor: 'rede' }
      ]
    },
    {
      titulo: 'Localização',
      detalhes: [
        { label: 'Localização', valor: 'localizacao' },
        { label: 'Região', valor: 'noRegiao' },
        { label: 'Código UF', valor: 'coUf' },
        { label: 'Sigla do Estado', valor: 'sgUf' },
        { label: 'Código do Município', valor: 'coMunicipio' },
        { label: 'Nome do Município', valor: 'noMunicipio' },
        { label: 'CEP', valor: 'coCep' },
        { label: 'Endereço', valor: 'dsEndereco' },
        { label: 'Número', valor: 'nuEndereco' },
        { label: 'Complemento', valor: 'dsComplemento' },
        { label: 'Bairro', valor: 'noBairro' }
      ]
    },
    {
      titulo: 'Contato',
      detalhes: [
        { label: 'DDD', valor: 'nuDdd' },
        { label: 'Telefone', valor: 'nuTelefone' },
        { label: 'Telefone Público', valor: 'nuTelefonePublico' },
        { label: 'Fax', valor: 'nuFax' }
      ]
    },
    {
      titulo: 'Extras',
      detalhes: [
        { label: 'Latitude', valor: 'latitude' },
        { label: 'Longitude', valor: 'longitude' }
      ]
    }
  ];

  constructor(private escolaDataService: EscolaDataService) {}

  ngOnInit() {
    // Quando os detalhes de uma escola são recebidos, eles são armazenados
    // na variável 'escola' e formatados para exibição.
    this.escolaDataService.escolaDetalhes.subscribe(detalhes => {
      if (detalhes) {
        this.escola = detalhes;
        this.escolaDetalhes = this.formatarDetalhes(detalhes);
      }
    });
  }

    // Trasnforma as chaves que estão na API para um formato mais legível
  formatarDetalhes(detalhes: any) {
    const mapeamentoDeRotulos: MapeamentoDeRotulos = {
      'nuanocenso': 'Ano do Censo',
      'coentidade': 'Código INEP',
      'noentidade': 'Nome da Escola',
      'tpdependencia': 'Tipo de Dependência',
      'rede': 'Rede de Ensino',
      'localizacao': 'Localização',
      'noregiao': 'Região',
      'couf': 'Código UF',
      'sguf': 'Sigla do Estado',
      'comunicipio': 'Código do Município',
      'nomunicipio': 'Nome do Município',
      'cocep': 'CEP',
      'dsendereco': 'Endereço',
      'nuendereco': 'Número',
      'dscomplemento': 'Complemento',
      'nobairro': 'Bairro',
      'nuddd': 'DDD',
      'nutelefone': 'Telefone',
      'nutelefonePublico': 'Telefone Público',
      'nufax': 'Fax',
      'latitude': 'Latitude',
      'longitude': 'Longitude'
    };
  
    let detalhesFormatados: { [key: string]: any } = {}; // Adicione a anotação de tipo aqui
    for (const chave of Object.keys(detalhes)) {
      const chaveFormatada = chave.toLowerCase();
      const rotuloAmigavel = mapeamentoDeRotulos[chaveFormatada] || chave;
      detalhesFormatados[rotuloAmigavel] = detalhes[chave];
    }
    return detalhesFormatados;
  }

  // Método para obter as chaves do objeto
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}