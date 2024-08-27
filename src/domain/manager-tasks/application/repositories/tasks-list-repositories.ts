import type { TaskList } from '../../enterprise/task-list'

export abstract class TasksListRepository {
  abstract findTaskListByAuthor(auhtorId: string): Promise<TaskList | undefined>

  abstract save(taskList: TaskList): Promise<void>

  abstract update(taskList: TaskList): Promise<void>
}
