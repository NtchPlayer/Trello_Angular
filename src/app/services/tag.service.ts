import {Injectable} from '@angular/core';
import {Task} from "../model/task.interface";
import {HttpClient} from "@angular/common/http";
import {Tag} from "../model/tag.interface";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  tags: Tag[] = [];

  constructor(
    private http: HttpClient,
  ) {
  }

  getTags() {
    return this.http.get<Tag[]>(`http://localhost:3000/tags`)
  }

}
