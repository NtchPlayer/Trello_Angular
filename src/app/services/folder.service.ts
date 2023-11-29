import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'
import { Folder } from '../model/folder.interface';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  docName: string = 'FOLDERS';

  folders: Folder[] = []

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getFolders() {
    return this.http.get(`http://localhost:3000/folders?userID=${this.auth.user?.id}`).subscribe((folders: any) => {
      this.folders = folders
    })
  }

  getOneFolder(id: number) {
    return this.afs.doc<Folder>(`${this.docName}/${id}`).snapshotChanges()
      .pipe(
        map((a) => {
            const data = a.payload.data() as any;
            const id = a.payload.id;
            return { ID: id, ...data };
          })
      );
  }

  searchFolders(search: string) {
    this.folders = this.folders.filter((folder: Folder) => {
      return folder.NAME.toLowerCase().includes(search.toLowerCase())
    })
  }

  createFolder(name: string) {

    const folderRef =  this.afs.collection(
      `${this.docName}`
    );

    let local = localStorage.getItem('user');

    if (!!local) {
      let user: User = JSON.parse(local) as User;

      folderRef.add({NAME: name, USER: user.ID}).then(() => {
        this.getFolders()
      });
    }
  }

  updateFolder(id: number, name: string) {

    const folderRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.docName}/${id}`
    );

    let local = localStorage.getItem('user');

    if (!!local) {
      let user: User = JSON.parse(local) as User;
      const folder: Folder = {
        ID: id,
        NAME: name,
        USER: user.ID,
      }

      folderRef.set({NAME: folder.NAME, USER: folder.USER}, {
        merge: true,
      }).then(() => {
        this.getFolders()
      });
    }
  }

  deleteFolder(id: number) {

    const folderRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.docName}/${id}`
    );

    folderRef.delete().then(() => {
      this.getFolders()
    });

  }
}
