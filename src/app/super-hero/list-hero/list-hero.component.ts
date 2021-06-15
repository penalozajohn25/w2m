import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DeleteHeroModalComponent } from '../components/delete-hero-modal/delete-hero-modal.component';
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
  isLoading$: Observable<boolean> | undefined;

  heroId!: FormGroup;

  element: any = []
  displayedColumns: string[] = ['id', 'name', 'Acciones'];
  dataSource: any;

  constructor(
    private heroService: HeroService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.heroId = this.formBuilder.group({
      id: [],
    });
  }

  getHeroId() {
    let id = this.heroId.controls['id'].value;
    console.log(id);
    this.element = [];
    this.heroService.getHeroId(id).subscribe(response => {
      this.element.push(response)
      this.dataSource = new MatTableDataSource<Hero>(this.element);
      this.dataSource.paginator = this.paginator;
      return this.dataSource;
    }, error =>{
      this.loadTable();
    })
  }

  ngAfterViewInit() {
    this.isLoading$ = this.heroService.isLoading$;
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
    const dialogRef = this.dialog.open(EditHeroComponent, {
      width: "550px"
    });
    const returnData = dialogRef.componentInstance.onAdd.subscribe((data: any) => {
      this.loadTable();
    });
  }

  openEditForm(values: Hero) {
    const dialogRef = this.dialog.open(EditHeroComponent, {
      width: "550px",
      data: values
    });
    const returnData = dialogRef.componentInstance.onAdd.subscribe((data: any) => {
      this.loadTable();
    });
  }

  deleteHero(values: Hero) {
    const dialogRef = this.dialog.open(DeleteHeroModalComponent, {
      width: "550px",
      data: values
    });
    const returnData = dialogRef.componentInstance.onAdd.subscribe((data: any) => {
      this.loadTable();
    });
  }
}


