// import { useState } from "react";

import { useEffect, useState } from "react";
function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  // Fetching data from localspace
  useEffect(() => {
    const todo = localStorage.getItem("todo");
    const completed = localStorage.getItem("completed");

    todo ? setTodos(JSON.parse(todo)) : null;
    completed ? setCompleted(JSON.parse(completed)) : null;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = [...todos, value];
    setTodos([...todos, value]);
    localStorage.setItem("todo", JSON.stringify(newTodo));
    e.preventDefault();
    setValue("");
  };

  //returning the list
  return (
    <div className="flex flex-col items-center ">
      {/*  TODO_list */}
      <h1 className="text-5xl font-extrabold mb-10">Do now!!!</h1>
      <div className="flex flex-row justify-around gap-20">
        <div className="tod">
          <h2 className="text-3xl ">Todo List</h2>

          {todos.length
            ? todos.map((todo, index) => {
                return (
                  <div
                    className="flex flex-row  items-center relative bg-yellow-50  border-[2px] border-blue-500 rounded-lg h-10 w-52 p-5"
                    key={index}
                  >
                    <input
                      type="radio"
                      name="completed"
                      className="me-2"
                      key={index}
                      onClick={() => {
                        const newTodoList = todos.filter((_, i) => i !== index);
                        const completedTodoList = todos.filter(
                          (_, i) => i == index
                        );
                        setTodos(newTodoList);
                        setCompleted([completedTodoList, ...completed]);
                        const newTodo = [completedTodoList[0], ...completed];

                        localStorage.setItem(
                          "completed",
                          JSON.stringify(newTodo)
                        );
                        let storedData = localStorage.getItem("todo");

                        if (storedData) {
                          let todos = JSON.parse(storedData);
                          const updatedTodo = todos.filter(
                            (todo) => todo !== completedTodoList[0]
                          );
                          // Convert the updated array back to a string
                          let updatedData = JSON.stringify(updatedTodo);

                          // Store the updated string back in localStorage
                          localStorage.setItem("todo", updatedData);
                        }
                      }}
                    ></input>
                    <h4>{todo}</h4>
                    <span
                      key={index}
                      className="absolute  top-[-10px] right-[-8px] border-[1px] border-black rounded-[50%] bg-white cursor-pointer"
                      onClick={() => {
                        const newTodoList = todos.filter((_, i) => i !== index);
                        setTodos(newTodoList);
                        let storedData = localStorage.getItem("todo");

                        if (storedData) {
                          let todoo = JSON.parse(storedData);
                          const updatedTodo = todoo.filter(
                            (todo) => todo !== todos[index]
                          );
                          // Convert the updated array back to a string
                          let updatedData = JSON.stringify(updatedTodo);

                          // Store the updated string back in localStorage
                          localStorage.setItem("todo", updatedData);
                        }
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18 6L6 18" stroke="black" />
                        <path d="M6 6L18 18" stroke="black" />
                      </svg>
                    </span>
                  </div>
                );
              })
            : null}

          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="todo"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                className="border-[2px] border-black me-3"
                value={value}
                required
              ></input>
              <input
                type="submit"
                className="border-[2px] border-black point cursor-pointer px-2 rounded-md hover:bg-blue-400 hover:text-white"
              ></input>
            </form>
          </div>
        </div>
        {/* Completed list */}

        {completed ? (
          <div>
            <h2>Completed</h2>
            {completed.map((task, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row  items-center  bg-yellow-50  border-[2px] border-blue-500 rounded-lg h-10 w-52 p-5"
                >
                  <input type="radio" name="completed" checked disabled></input>
                  <h4>{task}</h4>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
