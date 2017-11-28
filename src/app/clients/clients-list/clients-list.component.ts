import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { IClient } from '../Client';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as sortBy from 'lodash/sortBy';
import { RestService } from '../../services/core/rest.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  clients: IClient[] = [];
  errorMessage: string;
  searchForm: FormGroup;
  sortByName: boolean = false;
  sortType: string = 'id';
  searchData: string;
  totalItems: number = 6452;
  currentPage: number = 1;
  itemsPerPage: number = 50;
  pagerMaxSize: number = 10;
  isLoading: boolean = false;

  constructor(
    private clientService: ClientsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.searchData = this.route.snapshot.queryParams['search'] || null;
    this.sortType = this.route.snapshot.queryParams['sortBy'] || 'id';
    this.sortByName = this.route.snapshot.queryParams['sortBy'] === 'name' ? true : false;
    this.currentPage = this.route.snapshot.queryParams['page'] || 1;
    this.initForm();
    this.loadClients(this.searchData, null, null, null, (this.currentPage - 1) * this.itemsPerPage, this.itemsPerPage);
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      name: [this.searchData]
    });
  }

  doSearch(data: { [key: string]: string }): void {
    if (!data) {
      return;
    }
    this.errorMessage = null;
    this.isLoading = true;

    this.clientService.loadClients(data.name.trim().toLowerCase(), null, null, null, 0, this.itemsPerPage)
      .subscribe((response: IClient[]) => {
        if (!response.length) {
          this.errorMessage = `No results for ${data.name}`;
        } else {
          this.clients = sortBy(response, this.sortType);
          this.searchData = data.name;
        }
      }, (error) => {
        this.errorMessage = <any>error;
        console.log(error);
      }, () => {
        this.isLoading = false;
      });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    const from: number = (this.currentPage - 1) * this.itemsPerPage;
    this.loadClients(null, null, null, null, from, this.itemsPerPage);
  }

  loadClients(name?: string, phone?: string, birthYearFrom?: number, birthYearTo?: number, _start?: number, _limit?: number): void {
    this.isLoading = true;
    this.clientService.loadClients(name, phone, birthYearFrom, birthYearTo, _start, _limit).subscribe((response: IClient[]) => {
      this.clients = sortBy(this.mapClients(response), this.sortType);
      console.log(`Get ${response.length} clients.`, this.clients);
    }, (error) => {
      this.errorMessage = <any>error;
      console.log(error);
    }, () => { this.isLoading = false; });
  }

  mapClients(clients: IClient[]): IClient[] {
    return clients.map((client: IClient) => {
      return Object.assign({}, client, {
        mapedBirthDay: new Date(client.birthYear, client.birthMonth, client.birthDay)
      });
    });
  }

  sortBy(event: any) {
    this.sortType = this.sortByName ? 'name' : 'id';
    this.clients = sortBy(this.clients, this.sortType);
  }

}
