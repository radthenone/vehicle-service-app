import { Component, OnInit } from '@angular/core';
import { ServiceBookletService } from '../service-booklet.service';
import { ServiceBooklet } from '../service-booklet.interface';

@Component({
  selector: 'app-service-booklet-list',
  templateUrl: './service-booklet-list.component.html',
  styleUrls: ['./service-booklet-list.component.css'],
})
export class ServiceBookletListComponent implements OnInit {
  booklets: Omit<ServiceBooklet, 'vehicle'>[] = [];
  filteredBooklets: Omit<ServiceBooklet, 'vehicle'>[] = [];

  constructor(private serviceBookletService: ServiceBookletService) {}

  ngOnInit(): void {
    this.getBooklets();
  }

  getBooklets(): void {
    this.serviceBookletService.getBooklets().subscribe((booklets) => {
      this.booklets = booklets;
      this.filteredBooklets = booklets;
    });
  }

  onSearch(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.filteredBooklets = this.booklets;
      return;
    }

    this.filteredBooklets = this.booklets.filter(
      (booklet) =>
        booklet.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booklet.mileage.toString().includes(searchTerm) ||
        booklet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booklet.cost.toString().includes(searchTerm)
    );
  }

  onDeleteBooklet(id: number) {
    this.serviceBookletService.deleteBooklet(id).subscribe(() => {
      this.getBooklets();
    });
  }
}
