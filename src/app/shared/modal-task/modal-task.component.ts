import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from "../../model/task.interface";
import {TagService} from "../../services/tag.service";
import {Tag} from "../../model/tag.interface";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss']
})

export class ModalTaskComponent {
  @Input() taskId?: number;
  @Output() close: EventEmitter<any> = new EventEmitter();

  editTask?: Task;

  constructor(
    public taskService: TaskService,
    public authService: AuthService,
    public tagService: TagService
  ) {
  }


  taskForm: any = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    deadline: new FormControl(''),
    selectedTag: new FormControl('Ajouter une étiquette'),
    assignedUser: new FormControl('Assigner un utilisateur'),

  })

  currentTagList() {
    return this.tagService.tags.filter((tag: any) => {
      return !this.editTask?.tags?.includes(tag.id);
    });
  }

  currentUserList() {
    return this.authService.users.filter((user: any) => {
      return !this.editTask?.userId_assigned?.includes(user.id);
    });
  }

  addTag() {
    const selectedTagId = this.taskForm.get('selectedTag').value;
    const selectedTag: any = this.tagService.tags.find(tag => tag.id === selectedTagId);

    if (selectedTag && this.editTask) {
      if (!this.editTask.tags) {
        this.editTask.tags = [];
      }

      if (!this.editTask.tags.includes(selectedTag?.id)) {
        this.editTask.tags.push(selectedTag?.id);
      }
    }
    this.taskForm.get('selectedTag')?.setValue("Ajouter une étiquette")

  }

  addUser(){
    const selectedUserId = parseInt(this.taskForm.get('assignedUser').value);
    const selectedUser: any = this.authService.users.find(user => user.id === selectedUserId);
    console.log(selectedUserId)

    if (selectedUser && this.editTask) {
      if (!this.editTask.userId_assigned) {
        this.editTask.userId_assigned = [];
      }

      if (!this.editTask.userId_assigned.includes(selectedUser?.id)) {
        this.editTask.userId_assigned.push(selectedUser?.id);
      }
    }
    this.taskForm.get('assignedUser')?.setValue("Assigner un utilisateur")

  }


  sendTask() {
    try {
      console.log("sendtask")
      if (this.editTask) {
        this.taskService.updateTask({
          id: this.editTask.id,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          userId_assigned: this.editTask.userId_assigned,
          tags: this.editTask.tags,
          deadline: this.taskForm.value.deadline,
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

  getTask(id: number) {
    this.taskService.getOneTask(id).subscribe((task: Task) => {
      this.editTask = task
      this.taskForm.get('title')?.setValue(task.title)
      this.taskForm.get('description')?.setValue(task.description)
      this.taskForm.get('selectedTag')?.setValue("Ajouter une étiquette")
      this.taskForm.get('assignedUser')?.setValue("Assigner un utilisateur")
      this.taskForm.get('deadline')?.setValue(task.deadline)
    })
  }

  getUserName(id: number) {
    const user = this.authService.users.find((user: any) => user.id === id);
    return user?.username;
  }

  deleteTag(index: number) {
    this.editTask?.tags?.splice(index, 1)
    if (!this.editTask?.tags) return
    this.taskForm.tags = this.editTask.tags?.filter((tag, i) => i !== index)
  }

  deleteUser(index: number) {
    this.editTask?.userId_assigned?.splice(index, 1)
    if (!this.editTask?.userId_assigned) return
    this.taskForm.userId_assigned = this.editTask.userId_assigned?.filter((user, i) => i !== index)
  }

  ngOnInit() {
    if (this.taskId) {
      console.log("la tache s'ouvre")
      this.getTask(this.taskId)
      this.authService.getAllUsers();
      this.tagService.getTags();
    }
  }
}
