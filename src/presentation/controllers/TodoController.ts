import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { v4 as uuidv4 } from 'uuid'

import { CreateTodo } from '@/application/use-cases/todo/CreateTodo'
import { TodoValidator } from '@/application/validators/TodoValidator'
import { logger } from '@/infrastructure/utils/Logger'

export class TodoController {
  constructor (
        private createTodo: CreateTodo,
        // private getTodos: GetTodos,
        // private updateTodo: UpdateTodo,
        // private deleteTodo: DeleteTodo,
        private todoValidator: TodoValidator
  ) {
  }

  async create (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const todoData = JSON.parse(event.body || '{}')

      // const userId = event.requestContext.authorizer?.claims.sub;
      const userId = uuidv4()

      await this.todoValidator.validateCreateOrUpdate({ ...todoData, userId })

      const createdTodo = await this.createTodo.execute({ ...todoData, userId })

      return {
        statusCode: 201,
        body: JSON.stringify(createdTodo)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  //
  // async getAll(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  //     try {
  //         const todos = await this.getTodos.execute();
  //
  //         return {
  //             statusCode: 200,
  //             body: JSON.stringify(todos),
  //         };
  //     } catch (error) {
  //         // Handle error and return appropriate response
  //     }
  // }
  //
  // async update(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  //     try {
  //         const todoData = JSON.parse(event.body || '{}');
  //         await this.todoValidator.validateCreateOrUpdate(todoData);
  //
  //         const updatedTodo = await this.updateTodo.execute(todoData);
  //
  //         return {
  //             statusCode: 200,
  //             body: JSON.stringify(updatedTodo),
  //         };
  //     } catch (error) {
  //         // Handle error and return appropriate response
  //     }
  // }
  //
  // async delete(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  //     try {
  //         const { id } = event.pathParameters || {};
  //         await this.todoValidator.validateId(id);
  //
  //         await this.deleteTodo.execute({ id });
  //
  //         return {
  //             statusCode: 204,
  //             body: '',
  //         };
  //     } catch (error) {
  //         // Handle error and return appropriate response
  //     }
  // }
}
