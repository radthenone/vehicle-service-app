import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterLink } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, HomeComponent, SearchComponent],
  imports: [CommonModule, RouterLink, FormsModule, NgOptimizedImage],
  exports: [NavbarComponent, HomeComponent, SearchComponent],
})
export class SharedModule {}
