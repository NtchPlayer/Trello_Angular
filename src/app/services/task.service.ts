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
      this.tasks = tasks.sort((task1: Task, task2: Task) => task1.order - task2.order);
    })
  }

  getOneTask(id: number) {
    return this.http.get<Task>(`http://localhost:3000/tasks/${id}`)
  }

  createTask(task: Task) {
    this.http.post('http://localhost:3000/tasks', {
      title: task.title,
      description: task.description,
      userId_assigned: task.userId_assigned,
      tags: task.tags,
      deadline: task.deadline,
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
