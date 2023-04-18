import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Todo } from '../../core/domain/Todo';
import { TodoRepository } from '../../core/interfaces/repositories/TodoRepository';

export class TodoRepositoryAdapter implements TodoRepository {
    private ddbClient: DynamoDB;
    private readonly tableName: string;

    constructor(region: string, tableName: string) {
        this.ddbClient = new DynamoDB({ region });
        this.tableName = tableName;
    }

    async save(todo: Todo): Promise<Todo> {
        const Item = marshall({
            id: todo.id,
            userId: todo.userId,
            title: todo.title,
            completed: todo.completed,
        });

        const params = {
            TableName: this.tableName,
            Item,
        };

        await this.ddbClient.putItem(params);
        return todo;
    }

    async findById(id: string): Promise<Todo | null> {
        const params = {
            TableName: this.tableName,
            Key: marshall({ id }),
        };

        const result = await this.ddbClient.getItem(params);

        if (!result.Item) {
            return null;
        }

        const todoData = unmarshall(result.Item);
        return new Todo(todoData.id, todoData.userId, todoData.title, todoData.completed);
    }

    async findByUserId(userId: string): Promise<Todo[]> {
        const params = {
            TableName: this.tableName,
            IndexName: 'userId-index',
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: marshall({ ':userId': userId }),
        };

        const result = await this.ddbClient.query(params);
        const items = result.Items ?? [];

        return items.map((item) => {
            const todoData = unmarshall(item);
            return new Todo(todoData.id, todoData.userId, todoData.title, todoData.completed);
        });
    }


    async delete(id: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: marshall({ id }),
        };

        await this.ddbClient.deleteItem(params);
    }
}
