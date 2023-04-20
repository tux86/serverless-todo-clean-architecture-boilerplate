import {TodoController} from "../controllers/TodoController";
import {TodoRepository} from "../../infrastructure/database/TodoRepository";
import {CreateTodo} from "../../application/use-cases/todo/CreateTodo";
import {TodoValidator} from "../../application/validators/TodoValidator";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
const todoRepository = new TodoRepository();
const createTodo = new CreateTodo(todoRepository);
const todoValidator = new TodoValidator();
const todoController = new TodoController(createTodo, todoValidator)
export const create = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return await todoController.create(event);
};