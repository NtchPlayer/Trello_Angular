import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from "../../model/task.interface";
import {TagService} from "../../services/tag.service";
import {Tag} from "../../model/tag.interface";

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss']
})

export class ModalTaskComponent {
  @Input() editTask?: Task;
  @Output() close: EventEmitter<any> = new EventEmitter();
  tagList: Tag[] = []

  constructor(
    public taskService: TaskService,
    public tagService: TagService
  ) {
  }

  taskForm: any = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    deadline: new FormControl(''),
    selectedTag: new FormControl('Ajouter une étiquette')

  })

  addTag() {
    const selectedTagId = this.taskForm.get('selectedTag').value;
    const selectedTag:any = this.tagList.find(tag => tag.id === selectedTagId);

    if (selectedTag && this.editTask) {
      if (!this.editTask.tag) {
        this.editTask.tag = [];
      }

      if (!this.editTask.tag.includes(selectedTag?.id)) {
        this.editTask.tag.push(selectedTag?.id);
      }

      // Réinitialisez le FormControl de sélection de tag
      this.taskForm.get('selectedTag').reset().value('Ajouter une étiquette');
    }
    this.tagService.getTags().subscribe((tags: Tag[]) => {
      this.tagList = tags.filter((tag: any) => {
        return !this.editTask?.tag?.includes(tag.id);
      });
    });
  }


  sendTask() {
    try {
      if (this.editTask) {
        this.taskService.updateTask({
          id: this.editTask.id,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          tag: this.editTask.tag,
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
      this.taskForm.get('title')?.setValue(task.title)
      this.taskForm.get('description')?.setValue(task.description)
      this.taskForm.get('tag')?.setValue(task.tag)
      this.taskForm.get('deadline')?.setValue(task.deadline)
    })
  }

  deleteTag(index: number) {
    this.editTask?.tag?.splice(index, 1)
    if (!this.editTask?.tag) return
    this.taskForm.tag = this.editTask.tag?.filter((tag, i) => i !== index)
    this.tagService.getTags().subscribe((tags: Tag[]) => {
      this.tagList = tags.filter((tag: any) => {
        return !this.editTask?.tag?.includes(tag.id);
      });
    });
  }

  ngOnInit() {
    if (this.editTask) {
      this.getTask(this.editTask.id)
      this.tagService.getTags().subscribe((tags: Tag[]) => {
        this.tagList = tags.filter((tag: any) => {
          return !this.editTask?.tag?.includes(tag.id);
        });
      });
    }
  }
}
