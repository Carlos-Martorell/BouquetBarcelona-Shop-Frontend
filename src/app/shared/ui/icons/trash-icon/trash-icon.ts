import { Component, input } from '@angular/core';

@Component({
  selector: 'app-trash-icon',
  standalone: true,
  templateUrl: './trash-icon.html'
})
export class TrashIcon {
  size = input<number>(16);
  color = input<string>('currentColor');
}