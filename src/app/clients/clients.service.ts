import { Injectable } from '@angular/core';
import { RestService } from '../services/core/rest.service';
import { Observable } from 'rxjs/Observable';
import { IClient } from './Client';

@Injectable()
export class ClientsService {

    constructor(private restService: RestService) { }

    // tslint:disable-next-line:max-line-length
    loadClients(name?: string, phone?: string, birthYearFrom?: number, birthYearTo?: number, _start?: number, _limit?: number): Observable<IClient[]> {
        let params = ``;

        if (name) { params += `name=${name}&`; }
        if (phone) { params += `phone=${phone}&`; }
        if (birthYearFrom) { params += `birthYearFrom=${birthYearFrom}&`; }
        if (birthYearTo) { params += `birthYearTo=${birthYearTo}&`; }
        if (_start) { params += `_start=${_start}&`; }
        if (_limit) { params += `_limit=${_limit}&`; }
        if (params.length) { params = '?' + params.slice(0, -1); }

        return this.restService.fetch(`/clients${params}`);
    }

    loadClient(id: number): Observable<IClient> {
        return this.restService.fetch(`/clients/${id}`);
    }

    createClient(client: IClient): Observable<any> {
        return this.restService.post(`/clients`, client);
    }
}
