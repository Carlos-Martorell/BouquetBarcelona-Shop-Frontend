import { Component } from '@angular/core';
import { Footer, Navbar, Spinner } from "@shared";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
