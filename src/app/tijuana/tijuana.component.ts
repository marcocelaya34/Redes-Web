import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { ConfigService } from '../config.service';

@Component({
  selector: 'app-tijuana',
  templateUrl: './tijuana.component.html',
  styleUrls: ['./tijuana.component.scss'],
})
export class TijuanaComponent implements OnInit {
  items!: Observable<any>;
  name = new FormControl('');
  collectionDB;

  dir: string[] = [];
  path: string = '';

  constructor(private api: ConfigService, firestore: Firestore) {
    this.collectionDB = collection(firestore, 'credenciales');
  }

  quantity = [];

  ngOnInit(): void {
    this.onSave('ls');
  }

  async onSave(newCMD: string) {
    this.items = await collectionData(this.collectionDB);

    this.items.subscribe((data) => {
      var cmd: string = newCMD;
      let char = String.fromCharCode(10);
      /*  console.log(char);
      console.log('valor remplazado' + cmd.replace(/\\n/g, '\n')); */

      let remplaze = cmd.replace(/\\n/g, '\n');
      /*   console.log(remplaze); */
      this.api.getSmartphone(remplaze, data[0]).subscribe((data) => {
        const ddd = JSON.parse(JSON.stringify(data));

        this.quantity = ddd.message.split('\n');
        console.log(this.quantity);
      });
    });
  }

  async onSavePath(newCMD: string) {
    this.items = await collectionData(this.collectionDB);
    this.path = this.path + 'cd ' + newCMD + ' \n';
    this.dir.push('cd ' + newCMD);
    console.log(this.dir);

    this.items.subscribe((data) => {
      var cmd: string = this.path;

      let remplaze = cmd.replace(/\\n/g, '\n');

      this.api.getSmartphone(remplaze + ' ls', data[0]).subscribe((data) => {
        const ddd = JSON.parse(JSON.stringify(data));
        this.quantity = ddd.message.split('\n');
        console.log(this.quantity);
      });
    });
  }

  async return() {
    this.items = await collectionData(this.collectionDB);
    let url = '';

    this.dir.pop();

    for (let index = 0; index < this.dir.length; index++) {
      url = url + this.dir[index] + '\n';
    }

    url = url + ' ls';

    console.log(url);
    this.path = url;
    this.items.subscribe((data) => {
      this.api.getSmartphone(url, data[0]).subscribe((data) => {
        const ddd = JSON.parse(JSON.stringify(data));
        this.quantity = ddd.message.split('\n');
        console.log(this.quantity);
      });
    });
  }

  getExtension(item: string) {
    var ext = item.split('.');

    if (ext.length >= 2) {
      return item.split('.')[1];
    } else {
      return '0';
    }
  }
}
