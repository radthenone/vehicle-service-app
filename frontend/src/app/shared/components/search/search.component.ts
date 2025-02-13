import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value);
  }
}
