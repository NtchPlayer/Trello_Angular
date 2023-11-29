import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { FolderService } from '../../services/folder.service';
import {Folder} from "../../model/folder.interface";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  constructor(
    public folderService: FolderService,
  ) {}

  searchForm: any = new FormGroup({
    search: new FormControl('', [Validators.required])
  })

  displayModal: boolean = false;
  editFolder?: number = undefined;

  performSearch () {
    if (this.searchForm.invalid) {
      this.folderService.getFolders()
    }
    this.folderService.searchFolders(this.searchForm.value.search)
  }

  openEditModal (event: any, folderId?: number) {
    event.stopPropagation()
    event.preventDefault()
    this.displayModal = true
    this.editFolder = folderId
  }

  deleteFolder (event: any, folderId: number) {
    event.stopPropagation()
    event.preventDefault()
    this.folderService.deleteFolder(folderId)
  }

  ngOnInit() {
    this.folderService.getFolders()
  }
}
