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

  constructor(
    public taskService: TaskService,
  ) {}

  taskForm: any = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  sendTask() {
    try {
      if (this.editTask) {
        this.taskService.updateTask({
          id: this.editTask.id,
          checked: this.editTask.checked,
          name: this.taskForm.value.name,
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
      this.taskForm.get('name')?.setValue(task.name)
    })
  }

  ngOnInit() {
    if (this.editTask) {
      this.getTask(this.editTask.id)
    }
  }
}
