export default class SaveTaskDto {
  id: null | number;
  description?: string;
  name: string;
  tag: string;
  priority: string;
  createdAt?: Date; 
  updatedAt?: Date;
  userId: number; 
}
