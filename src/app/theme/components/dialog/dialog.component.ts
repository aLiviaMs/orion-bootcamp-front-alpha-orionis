import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  /**
   * Construtor do componente DialogComponent.
   *
   * @param dialogRef - Referência para o diálogo atual.
   * @param data - Dados a serem exibidos no diálogo, incluindo feedback, título, mensagem e uma função opcional.
   */
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      feedback: 'success' | 'error';
      title: string;
      message: string;
      onClick?: () => void;
    }
  ) {}

  /**
   * Método para fechar o diálogo.
   */

  public cancel(): void {
    this.dialogRef.close();
  }

  /**
   * Método para lidar com o clique no botão do diálogo.
   * Executa a função `onClick` se estiver definida e, em seguida, fecha o diálogo.
   */
  public onClick(): void {
    if (this.data.onClick) {
      this.data.onClick();
    }
    this.cancel();
  }
}
