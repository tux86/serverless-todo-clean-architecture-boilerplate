export const todoFunctions = {
  createTodo: {
    handler: 'src/presentation/handlers/todo.create',
    environment: {
    },
    events: [
      {
        http: {
          method: 'post',
          path: '/todos',
          cors: true
        }
      }
    ]
  }
}
