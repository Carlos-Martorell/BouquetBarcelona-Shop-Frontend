import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CartService } from '@cart';
import { AuthService } from '@auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  authService = inject(AuthService);
  cartService = inject(CartService)
  router = inject(Router);

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


  
}
