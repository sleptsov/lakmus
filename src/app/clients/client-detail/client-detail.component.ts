import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { IClient } from '../Client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  errorMessage: string;
  client: IClient;

  constructor(
    private clientService: ClientsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadClient(id);
  }

  loadClient(id: number): void {
    this.clientService.loadClient(id).subscribe((response: IClient) => {
      this.client = Object.assign({}, response, {
        mapedBirthDay: new Date(response.birthYear, response.birthMonth, response.birthDay)
      });
      console.log(`Get client with id: ${this.client.id}`);
    }, (error) => {
      this.errorMessage = <any>error;
      console.log(error);
    }, () => { });
  }

}
