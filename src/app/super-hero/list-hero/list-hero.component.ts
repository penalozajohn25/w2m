import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { EditHeroComponent } from '../edit-hero/edit-hero.component';
import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-list-hero',
  templateUrl: './list-hero.component.html',
  styleUrls: ['./list-hero.component.scss']
})
export class ListHeroComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  element: any = []
  displayedColumns: string[] = ['id', 'name', 'Acciones'];
  dataSource: any;

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadTable();
  }

  loadTable() {
    this.heroService.getHeroes().subscribe(hero => {
      this.element = (hero.length > 0) ? hero : [];
      this.dataSource = new MatTableDataSource<Hero>(this.element);
      this.dataSource.paginator = this.paginator;
      return this.dataSource;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openForm() {
    this.dialog.open(EditHeroComponent, {
      width: "550px",
      data: { name: "" }
    });
  }
}


