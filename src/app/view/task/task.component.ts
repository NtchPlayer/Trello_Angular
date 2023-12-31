import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router'
import { FolderService } from '../../services/folder.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Task } from '../../model/task.interface';
import { Folder } from '../../model/folder.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  constructor(
    public taskService: TaskService,
    private folderService: FolderService,
    private route: ActivatedRoute
  ) {}

  folderName: string = '';
  displayModal: boolean = false;
  taskId?: number;

  getTasks () {
    this.taskService.getTasks()
  }

  getFolderName (idFolder: number) {
    this.folderService.getOneFolder(idFolder).subscribe((folder: Folder) => {
      this.folderName = folder.name
    })
  }

  openEditModal (task?: Task) {
    this.displayModal = true
    this.taskId = task?.id
  }

  deleteTask (taskId: number) {
    this.taskService.deleteTask(taskId)
  }

  saveTask (task: any) {
    this.taskService.updateTask(task)
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.taskService.tasks, event.previousIndex, event.currentIndex);
    this.taskService.tasks.forEach((task: Task, index) => {
      this.taskService.updateTask({
        id: task.id,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        tags: task.tags,
        checked: task.checked,
        order: index + 1,
        userId_assigned: task.userId_assigned,
      })
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.taskService.idFolder = params.id
      this.getTasks()
      this.getFolderName(params.id)
    })

  }
}
