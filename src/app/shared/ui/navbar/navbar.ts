import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconCart } from './components/icon-cart/icon-cart';

@Component({
  selector: 'app-navbar',
  // imports: [RouterLink, RouterLinkActive, IconCart],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  imports: [IconCart],
})
export class Navbar {

  // authService = inject(AuthService);
  
  // onLogout() {
  //   this.authService.logout();
  // }

}
