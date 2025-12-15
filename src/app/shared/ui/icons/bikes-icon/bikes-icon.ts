import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bikes-icon',
  imports: [],
  templateUrl: './bikes-icon.html',
})
export class BikesIcon {
  size = input<number>(24);
  color = input<string>('#277c3c');
}
