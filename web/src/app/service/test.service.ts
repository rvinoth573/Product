
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class TestService extends ApiService<any, number> {

    constructor(protected http: HttpClient) {
        super(http, environment.apiUrl);
    }

}