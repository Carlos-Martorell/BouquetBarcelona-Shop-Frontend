import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BikesIcon } from '../icons/bikes-icon/bikes-icon';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, BikesIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();
}
