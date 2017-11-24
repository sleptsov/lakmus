import { Injectable } from '@angular/core';
import { RestService } from '../services/core/rest.service';
import { Observable } from 'rxjs/Observable';
import { IClient } from './Client';

@Injectable()
export class ClientsService {

    constructor(private restService: RestService) { }

    loadClients(): Observable<IClient[]> {
        return this.restService.fetch(`/clients`);
    }

    loadClient(id: number): Observable<IClient> {
        return this.restService.fetch(`/clients/${id}`);
    }

    createClient(client: IClient): Observable<any> {
        return this.restService.post(`/clients`, client);
    }
}
