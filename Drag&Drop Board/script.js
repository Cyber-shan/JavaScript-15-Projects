const boxes = document.querySelectorAll(".box");
const lists = document.querySelectorAll(".list");

// Attach drag events to the draggable tasks
for (const list of lists) {
  list.addEventListener("dragstart", dragStart);
  list.addEventListener("dragend", dragEnd);
}

// Attach drop events to the columns
for (const box of boxes) {
  box.addEventListener("dragover", dragOver);
  box.addEventListener("dragenter", dragEnter);
  box.addEventListener("dragleave", dragLeave);
  box.addEventListener("drop", dragDrop);
}


function dragStart(e) {
  // this allows the drop location to know which element is being moved when you release it
  e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
  console.log("Drag ended");
}

function dragOver(e) {
  // this line is important because by default, browsers don't allow you to drop elements onto other elements.
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("over");
}

function dragLeave(e) {
  this.classList.remove("over");
}

function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);

  this.appendChild(card);
  this.classList.remove("over");
}