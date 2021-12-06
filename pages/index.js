import { useState, useEffect } from "react";
import Head from "next/head";
import { supabase } from "../client";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    Name: "",
    Activity: "",
    StartDate: "",
    EndDate: "",
  });

  const { Name, Activity, StartDate, EndDate } = task;

  async function getTasks() {
    const { data } = await supabase.from("Task").select();
    setTasks(data);
    setLoading(false);
  }

  async function addTask() {
    await supabase
      .from("Task")
      .insert([
        {
          Name,
          Activity,
          StartDate,
          EndDate,
        },
      ])
      .single();
    setTask({
      Name: "",
      Activity: "",
      StartDate: "",
      EndDate: "",
    });
    getTasks();
  }

  async function deleteTask(id) {
    await supabase.from("Task").delete().eq("id", id); //the id of row to delete
    getTasks();
  }

  useEffect(() => {
    getTasks();
  }, []);

  // If Loading
  if (loading)
    return (
      <div className="flex justify-center items-center">
        <div
          className="
      animate-spin
      rounded-full
      h-32
      w-32
      border-t-2 border-b-2 border-blue-500 mt-36
    "
        ></div>
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div>
        <Head>
          <title>Supabase and NextJs Demo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-4xl font-bold mt-20">
            <a className="text-blue-600" href="/">
              Full Stack Application With Tailwind CSS and Supabase in NextJs
            </a>
          </h1>

          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <div className="p-8 mt-6 border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <div className="w-full max-w-sm">
                <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="taskName"
                    >
                      Task Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="taskName"
                      type="text"
                      value={Name.toString()}
                      onChange={(e) =>
                        setTask({ ...task, Name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="taskActivity"
                    >
                      Task Activity
                    </label>

                    <textarea
                      className="form-textarea mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="3"
                      placeholder="Task Activity"
                      value={Activity.toString()}
                      onChange={(e) =>
                        setTask({ ...task, Activity: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="startDate"
                    >
                      Task Start Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="startDate"
                      type="date"
                      value={StartDate.toString()}
                      onChange={(e) =>
                        setTask({ ...task, StartDate: e.target.value })
                      }
                      ß
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="endDate"
                    >
                      Task End Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="endDate"
                      type="date"
                      value={EndDate.toString()}
                      onChange={(e) =>
                        setTask({ ...task, EndDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={addTask}
                    >
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="p-2 mt-6 w-96 rounded-xl focus:text-blue-600">
              <table className="shadow-lg bg-white">
                <tbody>
                  <tr>
                    <th className="bg-blue-400 border text-left px-4 py-4">
                      S/N
                    </th>
                    <th className="bg-blue-400 border text-left px-8 py-4">
                      Name
                    </th>
                    <th className="bg-blue-400 border text-left px-8 py-4">
                      Activity
                    </th>
                    <th className="bg-blue-400 border text-left px-14 py-4">
                      Start Date
                    </th>
                    <th className="bg-blue-400 border text-left px-16 py-4">
                      End Date
                    </th>

                    <th className="bg-blue-400 border text-left px-4 py-4">
                      Action
                    </th>
                  </tr>
                  {task &&
                    tasks.map((task, index) => (
                      <tr key={task.id}>
                        <td className="border px-4 py-4">{index + 1}</td>
                        <td className="border px-4 py-4">{task.Name}</td>
                        <td className="border px-8 py-4">{task.Activity}</td>
                        <td className="border px-8 py-4">{task.StartDate}</td>
                        <td className="border px-8 py-4">{task.EndDate}</td>
                        <td className="border px-8 py-4">
                          {" "}
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => deleteTask(task.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
