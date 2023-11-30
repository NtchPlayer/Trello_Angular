import {User} from "./user.interface";

export interface Task {
  id: number;
  title: string;
  description?: string;
  tag?: string[];
  deadline?: any;
  user_assigned?: User[];
  checked: boolean;
  order: number;
  folder_id?: string;
}
