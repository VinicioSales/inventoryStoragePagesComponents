import { DomSanitizer } from '@angular/platform-browser';
import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.component.html',
  styleUrls: ['./modal-pdf.component.css']
})
export class ModalPdfComponent implements OnInit {
  
  pdfUrl: any;
  corBotaoConfirmar: string = 'var(--botao-verde)'
  corBotaoCancelar: string = 'var(--botao-vermelho)'
  corBotaoConfirmarHover: string = 'var(--botao-verde-hover)'
  corBotaoCancelarHover: string = 'var(--botao-vermelho-hover)'

  @Input() base64String: string = '';
  
  @Output() cancelarPdf = new EventEmitter<void>();
  @Output() criarSolicitacao = new EventEmitter<void>();
  
  //NOTE - constructor
  constructor(
    private sanitizer: DomSanitizer,
  ) {  }

  //NOTE - ngOnInit
  ngOnInit(): void {
    const pdfBlob = this.base64ToBlob(this.base64String);
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob));
  }


  //NOTE - base64ToBlob 
  base64ToBlob(base64Data: string): Blob {
    const byteString = window.atob(base64Data);
  
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
  
    const blob = new Blob([int8Array], { type: 'application/pdf' });
    return blob;
  }

  //NOTE - onCancelar
  onCancelar() {
    this.cancelarPdf.emit();
  }

  //NOTE - onConfirmar
  onConfirmar() {
    this.criarSolicitacao.emit();
  }
  
}
