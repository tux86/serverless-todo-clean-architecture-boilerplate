export const todoFunctions = {
  createTodo: {
    handler: 'src/presentation/handlers/todo.create',
    environment: {
      DYNAMODB_TABLE: '${env:DYNAMODB_TABLE}'
    },
    events: [
      {
        http: {
          method: 'post',
          path: 'todos',
          cors: true
        }
      }
    ]
  }
  // deleteTodo: {
  //     handler: 'src/presentation/handlers/todoController.deleteTodo',
  //     events: [
  //         {
  //             http: {
  //                 method: 'delete',
  //                 path: 'todos/{id}',
  //                 cors: true,
  //             },
  //         },
  //     ],
  // },
  // updateTodo: {
  //     handler: 'src/presentation/handlers/todoController.update',
  //     events: [
  //         {
  //             http: {
  //                 method: 'put',
  //                 path: 'todos/{id}',
  //                 cors: true,
  //             },
  //         },
  //     ],
  // },
  // getTodo: {
  //     handler: 'src/presentation/handlers/todoController.get',
  //     events: [
  //         {
  //             http: {
  //                 method: 'get',
  //                 path: 'todos/{id}',
  //                 cors: true,
  //             },
  //         },
  //     ],
  // },
}
