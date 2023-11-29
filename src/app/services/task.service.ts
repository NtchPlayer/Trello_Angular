import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.interface";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Folder} from "../model/folder.interface";
import {map, Observable} from "rxjs";
import {Task} from "../model/task.interface";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];
  idFolder?: number = undefined;

  docName: string = 'TASKS';

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
  ) { }

  getTasks() {

    this.afs.collection(this.docName, (ref) => ref.where('FOLDER', '==', this.idFolder)).snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return {ID: id, ...data};
        });
      })
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks.sort((task1: Task, task2: Task) => task1.ORDER - task2.ORDER);
    });
  }

  getOneTask(id: number) {
    return this.afs.doc<Folder>(`${this.docName}/${id}`).snapshotChanges()
      .pipe(
        map((a) => {
          const data = a.payload.data() as any;
          const id = a.payload.id;
          return { ID: id, ...data };
        })
      );
  }

  createTask(name: string) {
    const folderRef =  this.afs.collection(
      `${this.docName}`
    );

    folderRef.add({CHECKED: false, FOLDER: this.idFolder, NAME: name, ORDER: this.tasks.length + 1}).then(() => {
      this.getTasks()
    });
  }

  updateTask(task: Task) {

    const folderRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.docName}/${task.ID}`
    );

    folderRef.set({CHECKED: task.CHECKED, FOLDER: this.idFolder, NAME: task.NAME, ORDER: task.ORDER}, {
      merge: true,
    }).then(() => {
      this.getTasks()
    });
  }

  deleteTask(id: number) {
    const folderRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${this.docName}/${id}`
    );

    folderRef.delete().then(() => {
      this.getTasks()
    });
  }
}
