import {User} from "./user.interface";

export interface Task {
  id: number;
  title: string;
  description?: string;
  tags: string[];
  deadline?: any;
  userId_assigned?: number[];
  checked: boolean;
  order: number;
  folder_id?: string;
}
