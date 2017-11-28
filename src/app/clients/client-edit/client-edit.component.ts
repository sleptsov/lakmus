import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { IClient } from '../Client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  editClientForm: FormGroup;
  client: IClient;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(params => {
      this.loadClient(+params['id']);
    });
  }

  initForm(): void {
    this.editClientForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      date: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  patchForm(client: IClient): void {
    this.editClientForm.patchValue({
      name: client.name,
      gender: client.gender,
      date: this.parseDate(client),
      phone: client.phone,
      email: client.email,
      address: client.address,
      description: client.description
    });
  }

  loadClient(id: number): void {
    if (id === 0) {
      this.editClientForm.reset();
      this.client = null;
      return;
    }
    this.clientService.loadClient(id).subscribe((response: IClient) => {
      this.client = Object.assign({}, response, {
        mapedBirthDay: new Date(response.birthYear, response.birthMonth, response.birthDay)
      });
      this.patchForm(this.client);
      console.log(`Get client with id: ${this.client.id}`);
    }, (error) => {
      this.errorMessage = <any>error;
      console.log(error);
    }, () => { });
  }

  onSubmit(data: any) {
    if (!data) {
      return;
    }
    const client: IClient = {
      name: data.name,
      gender: data.gender,
      birthYear: new Date(data.date).getFullYear(),
      birthMonth: new Date(data.date).getMonth(),
      birthDay: new Date(data.date).getDay(),
      phone: data.phone,
      email: data.email,
      description: data.description,
      address: data.address
    };

    this.clientService.createClient(client).subscribe((response: IClient) => {
      console.log('RESPONSE', response);
    }, (error) => {
      this.errorMessage = <any>error;
      console.log(error);
    }, () => {
      this.cancel();
    });
  }

  cancel(): void {
    this.editClientForm.reset();
    this.router.navigate(['/clients'], { queryParamsHandling: 'preserve' });
  }

  parseDate(client: IClient): string {
    const date = new Date(client.birthYear, client.birthMonth, client.birthDay).toISOString().slice(0, 10);
    return date;
  }

}
