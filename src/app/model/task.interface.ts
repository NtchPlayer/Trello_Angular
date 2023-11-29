export interface Task {
  id: number;
  checked: boolean;
  folder?: string;
  name: string;
  order: number;
}
