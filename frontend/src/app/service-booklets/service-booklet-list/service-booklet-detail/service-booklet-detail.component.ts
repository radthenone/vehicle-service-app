import { Component, OnInit } from '@angular/core';
import { ServiceBooklet } from '../../service-booklet.interface';
import { ActivatedRoute } from '@angular/router';
import { ServiceBookletService } from '../../service-booklet.service';

@Component({
  selector: 'app-service-booklet-detail',
  templateUrl: './service-booklet-detail.component.html',
  styleUrls: ['./service-booklet-detail.component.css']
})
export class ServiceBookletDetailComponent implements OnInit{
  booklet: Omit<ServiceBooklet, 'vehicle'> | null = null;
  constructor(
    private serviceBookletService: ServiceBookletService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const bookletId = this.route.snapshot.paramMap.get('id');
    if (bookletId) {
      this.serviceBookletService.getBooklet(+bookletId).subscribe((booklet) => (this.booklet = booklet));
    }
  }

  deleteBooklet(): void {
    if (this.booklet && this.booklet.id) {
      this.serviceBookletService.deleteBooklet(this.booklet.id).subscribe(() => {
        this.booklet = null;
      });
    }
  }
}
