import Resource from './Resource';
import uuid from 'uuid';

function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

const todos = new Map();
function listTodos() {
  return timeout(1000).then(() => {
    const entries = Array.from(todos.entries());
    return entries.map(([key, value]) => {
      return { id: key, description: value };
    });
  });
}

export function fetchTodos() {
  return new Resource(listTodos());
}

function createTodo(todo) {
  return timeout(1000).then(() => {
    const id = uuid();
    todos.set(id, todo);
    return { id, todo };
  });
}

export function createAndRefreshTodos(todo) {
  return new Resource(createTodo(todo).then(listTodos));
}

export function attemptLogin() {
  return new Resource(
    timeout(5000).then({
      error: 'username in use'
    })
  );
}

export function fetchSlowResource() {
  return new Resource(timeout(3000).then(() => 'Hello, slow screen!'));
}

export function fetchUserProfile() {
  // Respresent some async method here and return the user after a few sceonds
  // Throw if a user has not been logged in
  return new Resource(
    timeout(1000).then(() => Promise.reject('not authenticated!'))
  );
}
