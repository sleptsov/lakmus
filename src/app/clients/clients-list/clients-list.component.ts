import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { IClient } from '../Client';
import * as chunk from 'lodash/chunk';
import * as sortBy from 'lodash/sortBy';
import * as flattenDeep from 'lodash/flattenDeep';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  clients: IClient[] = [];
  errorMessage: string;

  totalItems: number = 50;
  currentPage: number = 0;
  itemsPerPage: number = 10;

  constructor(private clientService: ClientsService) { }

  ngOnInit() {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.loadClients().subscribe((response: IClient[]) => {
      this.clients = response;
      this.totalItems = response.length;
      this.clients = this.clients.map((client: IClient) => {
        return Object.assign({}, client, {
          mapedBirthDay: new Date(client.birthYear, client.birthMonth, client.birthDay)
        });
      });
      this.clients = chunk(this.clients, this.itemsPerPage);
      console.log(`Get ${response.length} clients.`, this.clients);
    }, (error) => {
      this.errorMessage = <any>error;
      console.log(error);
    }, () => { });
  }

  sort(): void {
    const sorted = chunk(sortBy(flattenDeep(this.clients), ['name', 'gender']), this.itemsPerPage);
    this.clients = sorted;
  }

}
