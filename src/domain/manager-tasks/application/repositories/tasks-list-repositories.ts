import { TaskList } from '../../enterprise/task-list'

export abstract class TasksListRepository {
  abstract findTaskListByAuthor(authorId: string): Promise<TaskList | null>

  abstract create(taskList: TaskList): Promise<void>

  abstract update(taskList: TaskList): Promise<void>
}
