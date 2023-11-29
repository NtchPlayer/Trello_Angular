import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Folder } from '../model/folder.interface';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  docName: string = 'FOLDERS';

  folders: Folder[] = []

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getFolders() {
    return this.http.get(`http://localhost:3000/folders?userID=${this.auth.user?.id}`).subscribe((folders: any) => {
      this.folders = folders
    })
  }

  getOneFolder(id: number) {
    return this.http.get<Folder>(`http://localhost:3000/folders/${id}`)
  }

  searchFolders(search: string) {
    let searchQuery = ''
    if (search) {
      searchQuery = `?name_like=${search.toLowerCase()}`
    }

    return this.http.get(`http://localhost:3000/folders${searchQuery}`).subscribe((folders: any) => {
      this.folders = folders
    })
  }

  createFolder(name: string) {
      this.http.post('http://localhost:3000/folders', {
        name
      }).subscribe(() => {
        this.getFolders()
      })
  }

  updateFolder(id: number, name: string) {
    this.http.put(`http://localhost:3000/folders/${id}`, {
      name
    }).subscribe(() => {
      this.getFolders()
    })
  }

  deleteFolder(id: number) {
    this.http.delete(`http://localhost:3000/folders/${id}`).subscribe(() => {
      this.getFolders()
    })
  }
}
