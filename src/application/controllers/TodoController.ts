import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { TodoService } from '../../core/interfaces/services/TodoService';

export class TodoController {
    constructor(private todoService: TodoService) {}

    async createTodo(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            // const userId = event.requestContext.authorizer?.claims?.sub;
            // if (!userId) {
            //     throw new Error('User ID not found');
            // }

            const userId = '1234'

            const body = JSON.parse(event.body || '{}');
            const { title } = body;

            const todo = await this.todoService.createTodo(userId, title);

            return {
                statusCode: 201,
                body: JSON.stringify(todo),
            };
        } catch (error :any ) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: error.message }),
            };
        }
    }

    async getTodoById(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            const { id } = event.pathParameters || {};

            if (!id) {
                throw new Error('Todo ID not found');
            }

            const todo = await this.todoService.getTodoById(id);

            if (!todo) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Todo not found' }),
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify(todo),
            };
        } catch (error :any ) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: error.message }),
            };
        }
    }

    async updateTodo(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            // const userId = event.requestContext.authorizer?.claims?.sub;
            // if (!userId) {
            //     throw new Error('User ID not found');
            // }

            const userId = '1234'

            const { id } = event.pathParameters || {};

            if (!id) {
                throw new Error('Todo ID not found');
            }

            const body = JSON.parse(event.body || '{}');
            const { title, completed } = body;

            const todo = await this.todoService.updateTodo(id, userId, title, completed);

            return {
                statusCode: 200,
                body: JSON.stringify(todo),
            };
        } catch (error :any ) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: error.message }),
            };
        }
    }

    async deleteTodo(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            // const userId = event.requestContext.authorizer?.claims?.sub;
            // if (!userId) {
            //     throw new Error('User ID not found');
            // }

            const userId = '1234'

            const { id } = event.pathParameters || {};

            if (!id) {
                throw new Error('Todo ID not found');
            }

            await this.todoService.deleteTodo(id, userId);

            return {
                statusCode: 204,
                body: '',
            };
        } catch (error :any ) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: error.message }),
            };
        }
    }
}