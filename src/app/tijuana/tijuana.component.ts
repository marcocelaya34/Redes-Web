import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { ConfigService } from '../config.service';

@Component({
  selector: 'app-tijuana',
  templateUrl: './tijuana.component.html',
  styleUrls: ['./tijuana.component.scss'],
})
export class TijuanaComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  nameFile = new FormControl('');
  nameFolder = new FormControl('');
  nameEdit = new FormControl('');
  oldnameEdit: string = '';

  dir: string[] = [];
  path: string = '';

  constructor(private api: ConfigService, afs: AngularFirestore) {
    this.itemDoc = afs.doc<any>('credenciales/local');
    this.item = this.itemDoc.valueChanges();
  }

  files = [];

  ngOnInit(): void {
    this.onSave();
  }

  async onSave() {
    console.log('INICIANDO');
    this.item.subscribe((data) => {
      console.log(data);
      this.api.getSmartphone('ls', data).subscribe((data) => {
        console.log(data);
        const responseSSH = JSON.parse(JSON.stringify(data));
        this.files = responseSSH.message.split('\n');
      });
    });
  }

  async onSavePath(newCMD: string) {
    console.log('ABRIENDO CARPETA');
    if (this.getExtension(newCMD) == '0') {
      this.path = this.path + 'cd ' + newCMD + ' \n';
      this.dir.push('cd ' + newCMD);

      this.item.subscribe((data) => {
        var cmd: string = this.path;
        let remplaze = cmd.replace(/\\n/g, '\n');

        this.api.getSmartphone(remplaze + ' ls', data).subscribe((data) => {
          const responseSSH = JSON.parse(JSON.stringify(data));
          console.log('Repsuesta ssh: ' + responseSSH.message);
          this.files = responseSSH.message.split('\n');
        });
      });
    }
  }

  async return() {
    let url = '';
    this.dir.pop();

    for (let index = 0; index < this.dir.length; index++) {
      url = url + this.dir[index] + '\n';
    }
    console.log('RETURN');
    this.path = url;
    this.item.subscribe((data) => {
      this.api.getSmartphone(url + ' ls', data).subscribe((data) => {
        const responseSSH = JSON.parse(JSON.stringify(data));
        this.files = responseSSH.message.split('\n');
      });
    });
  }

  async createFile() {
    let url = '';

    for (let index = 0; index < this.dir.length; index++) {
      url = url + this.dir[index] + '\n';
    }
    console.log('RETURN');
    console.log(this.nameFile.value);
    this.path = url;
    this.item.subscribe((data) => {
      this.api
        .getSmartphone(url + `touch ${this.nameFile.value}` + '\n' + 'ls', data)
        .subscribe((data) => {
          this.nameFile.setValue('');
          const responseSSH = JSON.parse(JSON.stringify(data));
          this.files = responseSSH.message.split('\n');
        });
    });
  }

  async createFolder() {
    let url = '';

    for (let index = 0; index < this.dir.length; index++) {
      url = url + this.dir[index] + '\n';
    }
    console.log('RETURN');
    this.path = url;
    this.item.subscribe((data) => {
      this.api
        .getSmartphone(
          url + `mkdir ${this.nameFolder.value}` + '\n' + 'ls',
          data
        )
        .subscribe((data) => {
          this.nameFolder.setValue('');
          const responseSSH = JSON.parse(JSON.stringify(data));
          this.files = responseSSH.message.split('\n');
        });
    });
  }

  async saveName(oldName: string) {
    this.oldnameEdit = oldName;
  }

  async edit() {
    let url = '';

    for (let index = 0; index < this.dir.length; index++) {
      url = url + this.dir[index] + '\n';
    }
    console.log('RETURN');
    this.path = url;
    this.item.subscribe((data) => {
      this.api
        .getSmartphone(
          url + `mv ${this.oldnameEdit}  ${this.nameEdit.value}` + '\n' + 'ls',
          data
        )
        .subscribe((data) => {
          this.nameEdit.setValue('');
          this.oldnameEdit = '';
          const responseSSH = JSON.parse(JSON.stringify(data));
          this.files = responseSSH.message.split('\n');
        });
    });
  }

  delete(item: string) {
    console.log('BORRANDO');
    var newItem = item.toString().replace(/\s/g, ' ');
    var actualRute = this.path + 'ls';
    this.path = this.path + 'rm -rf ' + '"' + newItem + '"' + '\n';

    var urlDelete = this.path;
    this.item.subscribe((data) => {
      var cmd: string = urlDelete;
      let remplaze = actualRute.replace(/\\n/g, '\n').replace(/"/g, '\\"');

      /* Borramos la carpetw */
      console.log('CMB: ' + cmd + remplaze);
      this.api.getSmartphone(cmd + remplaze, data).subscribe((data) => {
        this.path = actualRute.replace('ls', '');
        const responseSSH = JSON.parse(JSON.stringify(data));
        console.log('Repsuesta ssh: ' + responseSSH.message);
        this.files = responseSSH.message.split('\n');
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
