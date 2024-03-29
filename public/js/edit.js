const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const inpVal = document.querySelector(".value");
const myForm = document.querySelector(".form-class");

const task_id = document.querySelector(".task_id");
const task_value = document.querySelector(".value");
const compVal = document.querySelector(".completed");

const showTask = async () => {
  const {
    data: { task: singleTask },
  } = await axios.get(`http://localhost:5000/api/v1/tasks/${id}`);

  const { _id, task, completed } = singleTask;
  task_id.innerHTML = `Task id: ${_id}`;
  task_value.value = task;
  compVal.innerHTML = completed;
};
showTask();

const updateTask = async (e) => {
  e.preventDefault();
  const task = inpVal.value;
  await axios.patch(`http://localhost:5000/api/v1/tasks/${id}`, {
    task,
  });
  window.location = "../";
};
myForm.addEventListener("submit", updateTask);
