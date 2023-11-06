import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoComponent } from './botao.component'; // Ajuste o caminho conforme necessário

@NgModule({
    declarations: [BotaoComponent],
    imports: [CommonModule],
    exports: [BotaoComponent],
})
export class BotaoTestingModule {}
