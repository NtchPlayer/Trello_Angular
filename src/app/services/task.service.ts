import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];
  idFolder?: number = undefined;

  constructor(
    private http: HttpClient,
  ) {}

  getTasks() {
    return this.http.get<Task[]>(`http://localhost:3000/tasks?idFolder=${this.idFolder}`).subscribe((tasks: any) => {
      this.tasks = tasks
    })
  }

  getOneTask(id: number) {
    return this.http.get<Task>(`http://localhost:3000/tasks/${id}`)
  }

  createTask(name: string) {
    this.http.post('http://localhost:3000/tasks', {
      name,
      checked: false,
      idFolder: this.idFolder
    }).subscribe(() => {
      this.getTasks()
    })
  }

  updateTask(task: Task) {
    this.http.put(`http://localhost:3000/tasks/${task.id}`, {
      ...task,
      idFolder: this.idFolder
    }).subscribe(() => {
      this.getTasks()
    })
  }

  deleteTask(id: number) {
    this.http.delete(`http://localhost:3000/tasks/${id}`).subscribe(() => {
      this.getTasks()
    })
  }
}
