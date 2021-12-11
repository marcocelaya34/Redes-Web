import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: Observable<any>;

  constructor(private api: ConfigService, firestore: Firestore) {
    const collectionDB = collection(firestore, 'credenciales');
    this.items = collectionData(collectionDB);
  }

  quantity = [];

  ngOnInit(): void {}
}
