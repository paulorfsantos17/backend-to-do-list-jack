import type { Task } from '../enterprise/task'
import type { TasksListRepository } from '../repositories/tasks-list-repositories'

interface FetchAllTasksUseCaseRequest {
  authorId: string
}
interface FetchAllTasksUseCaseResponse {
  tasks: Task[]
}

export class FetchAllTasksUseCase {
  constructor(private tasksListRepository: TasksListRepository) {}

  async execute({
    authorId,
  }: FetchAllTasksUseCaseRequest): Promise<FetchAllTasksUseCaseResponse | null> {
    const taskList =
      await this.tasksListRepository.findTaskListByAuthor(authorId)

    // Não retorno um erro se a TaskList não existir, pois ela será criada automaticamente
    // ao adicionar a primeira tarefa. Como cada usuário terá apenas uma TaskList,
    // essa abordagem simplifica o fluxo atual. Além disso, se no futuro for necessário
    // permitir múltiplas TaskLists por usuário, essa lógica poderá ser adaptada
    // facilmente com mudanças mínimas no código.
    if (!taskList) {
      return null
    }

    return {
      tasks: taskList.tasks,
    }
  }
}
