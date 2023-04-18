import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import {TodoController} from '../controllers/TodoController';
import {TodoServiceImplementation} from '../../core/services/TodoServiceImplementation';
import {TodoRepositoryAdapter} from '../../infrastructure/adapters/TodoRepositoryAdapter';
import {env} from 'process';

const todoRepository = new TodoRepositoryAdapter(env.DB_REGION || '', env.DB_TABLE_NAME||'');
const todoService = new TodoServiceImplementation(todoRepository);
const todoController = new TodoController(todoService);

const createTodo: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return todoController.createTodo(event);
};

const getTodoById: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return todoController.getTodoById(event);
};

const updateTodo: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return todoController.updateTodo(event);
};

const deleteTodo: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return todoController.deleteTodo(event);
};

export {createTodo, getTodoById, updateTodo, deleteTodo};
