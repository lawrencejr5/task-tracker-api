const itemsContainer = document.querySelector(".items");
const myForm = document.querySelector(".form-class");
const inpVal = document.querySelector(".value");
const alertt = document.querySelector(".alert");

const restoreToDefault = () => {
  myForm.reset();
};
const getTasks = async () => {
  const {
    data: { tasks },
  } = await axios.get("http://localhost:5000/api/v1/tasks");

  const taskItems = tasks.map((item) => {
    const { task, _id } = item;

    return `
        <div class="item" data-id="${_id}">
            <span class="item-content">${task}</span>
            <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        </div>`;
  });

  itemsContainer.innerHTML = taskItems.join("");

  const editBtn = document.querySelectorAll(".edit");
  editBtn.forEach((btn) => {
    btn.addEventListener("click", getSingleTask);
  });
  const delBtn = document.querySelectorAll(".delete");
  delBtn.forEach((btn) => {
    btn.addEventListener("click", deleteTask);
  });
};
getTasks();

const getSingleTask = async (e) => {
  const parent = e.currentTarget.parentElement.parentElement;
  const id = parent.dataset.id;
  window.location = `/task.html?id=${id}`;
};

const addTask = async (e) => {
  e.preventDefault();
  const task = inpVal.value;
  await axios.post("http://localhost:5000/api/v1/tasks", { task });
  getTasks();
  displayAlert("Item added successfully", "alert-success");
  restoreToDefault();
};
myForm.addEventListener("submit", addTask);

const deleteTask = async (e) => {
  const parent = e.currentTarget.parentElement.parentElement;
  const id = parent.dataset.id;
  await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`);
  getTasks();
  displayAlert("Item deleted", "alert-danger");
};

function displayAlert(text, color) {
  alertt.textContent = text;
  alertt.classList.add(color);
  setTimeout(function () {
    alertt.textContent = "";
    alertt.classList.remove(color);
  }, 1000);
}
