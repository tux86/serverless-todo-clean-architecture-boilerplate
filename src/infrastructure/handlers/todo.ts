import { CreateTodo } from '@/application/usecases/todo/CreateTodo'
import { DeleteTodo } from '@/application/usecases/todo/DeleteTodo'
import { GetTodo } from '@/application/usecases/todo/GetTodo'
import { ListTodos } from '@/application/usecases/todo/ListTodos'
import { UpdateTodo } from '@/application/usecases/todo/UpdateTodo'
import { TodoValidator } from '@/application/validators/TodoValidator'
import { createApiGatewayHandler } from '@/infrastructure/aws/awsHandlerAdapter'
import { Config } from '@/infrastructure/Config'
import { TodoRepositoryImpl } from '@/infrastructure/repositories/TodoRepositoryImpl'
import { CreateTodoController } from '@/presentation/controllers/todo/CreateTodoController'
import { DeleteTodoController } from '@/presentation/controllers/todo/DeleteTodoController'
import { GetTodoController } from '@/presentation/controllers/todo/GetTodoController'
import { ListTodoController } from '@/presentation/controllers/todo/ListTodosController'
import { UpdateTodoController } from '@/presentation/controllers/todo/UpdateTodoController'

const { todosTable } = Config.getInstance().dynamodb.tables
const todoRepository = new TodoRepositoryImpl(todosTable)
const createTodoUseCase = new CreateTodo(todoRepository, new TodoValidator())
const updateTodoUseCase = new UpdateTodo(todoRepository, new TodoValidator())
const getTodoUseCase = new GetTodo(todoRepository)
const listTodosUseCase = new ListTodos(todoRepository)
const deleteTodoUseCase = new DeleteTodo(todoRepository)

const createTodoController = new CreateTodoController(createTodoUseCase)
const updateTodoController = new UpdateTodoController(updateTodoUseCase)
const getTodoController = new GetTodoController(getTodoUseCase)
const listTodoController = new ListTodoController(listTodosUseCase)
const deleteTodoController = new DeleteTodoController(deleteTodoUseCase)

export const createTodo = createApiGatewayHandler(createTodoController)
export const updateTodo = createApiGatewayHandler(updateTodoController)
export const getTodo = createApiGatewayHandler(getTodoController)
export const listTodos = createApiGatewayHandler(listTodoController)
export const deleteTodo = createApiGatewayHandler(deleteTodoController)
