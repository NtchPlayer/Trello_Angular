import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FolderService } from '../../services/folder.service';
import {Folder} from "../../model/folder.interface";

@Component({
  selector: 'app-modal-folder',
  templateUrl: './modal-folder.component.html',
  styleUrls: ['./modal-folder.component.scss']
})
export class ModalFolderComponent implements OnInit {
  @Input() editFolder: undefined | number;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    public folderService: FolderService,
  ) {}

  folderForm: any = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  sendFolder() {
    try {
      if (this.editFolder) {
        this.folderService.updateFolder(this.editFolder, this.folderForm.value.name)
      } else {
        this.folderService.createFolder(this.folderForm.value.name)
      }
      this.closeModal()
    } catch (e) {
      console.log('error', e)
    }
  }

  closeModal() {
    this.close.emit()
  }


  getFolder (id: number) {
    this.folderService.getOneFolder(id).subscribe((folder: Folder) => {
      this.folderForm.get('name')?.setValue(folder.name)
    })
  }

  ngOnInit() {
    if (this.editFolder) {
      this.getFolder(this.editFolder)
    }
  }
}
