import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Task} from "../../model/task.interface";

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss']
})

export class ModalTaskComponent {
  @Input() editTask?: Task;
  @Output() close: EventEmitter<any> = new EventEmitter();
  tags?: string[] = []
  constructor(
    public taskService: TaskService,
  ) {}

  taskForm: any = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', )
  })

  sendTask() {
    try {
      if (this.editTask) {
        this.taskService.updateTask({
          id: this.editTask.id,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          tag: this.editTask.tag,
          deadline: this.editTask.deadline,
          checked: this.editTask.checked,
          order: this.editTask.order
        })
      } else {
        this.taskService.createTask(this.taskForm.value.name)
      }
      this.closeModal()
    } catch (e) {
      console.log('error', e)
    }
  }

  closeModal() {
    this.close.emit()
  }

  getTask (id: number) {
    this.taskService.getOneTask(id).subscribe((task: Task) => {
      this.taskForm.get('title')?.setValue(task.title)
      this.taskForm.get('description')?.setValue(task.description)
      this.tags = task.tag
    })
  }

  ngOnInit() {
    if (this.editTask) {
      this.getTask(this.editTask.id)
    }
  }
}
