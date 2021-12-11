import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ICrendential } from './Interfaces/credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  body = {
    password: 'Stella.2021',
    user: 'marcoc',
    address: '192.168.100.151',
    cmd: 'cd Downloads \n ls',
  };

  getSmartphone(cmd: string, item: ICrendential) {
    return this.http.post('http://localhost:3000', {
      password: item.password,
      user: item.user,
      address: item.address,
      cmd: cmd,
    });
  }
}
