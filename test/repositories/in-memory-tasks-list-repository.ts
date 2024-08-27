import type { TaskList } from '@/domain/manager-tasks/enterprise/task-list'
import type { TasksListRepository } from '@/domain/manager-tasks/repositories/tasks-list-repositories'

export class InMemoryTasksListRepository implements TasksListRepository {
  public items: TaskList[] = []
  async findTaskListByAuthor(authorId: string): Promise<TaskList | undefined> {
    const taskList = this.items.find(
      (taskList) => taskList.authorId.toString() === authorId,
    )

    if (!taskList) return null

    return taskList
  }

  async save(taskList: TaskList): Promise<void> {
    this.items.push(taskList)
  }

  async update(taskList: TaskList): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === taskList.id.toString(),
    )

    if (index === -1) throw new Error('Task list not found')

    this.items[index] = taskList
  }
}
