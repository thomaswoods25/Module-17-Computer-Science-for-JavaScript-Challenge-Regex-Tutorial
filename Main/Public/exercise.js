const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout")

let workoutType = null;
let shouldNavigateAway = false;

async function initExercise() {
  let workout;

  if (location.search.split("=")[1] === undefined) {
    workout = await API.createWorkout()
    console.log(workout)
  }
  if (workout) {
    location.search = "?id=" + workout._id;
  }

}

initExercise();

function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;

  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }


}

async function handleFormSubmit(event) {
  event.preventDefault();

  let workoutData = {};

  if (workoutType === "cardio") {
    
  } else if (workoutType === "resistance") {

  }

  await API.addExercise(workoutData);
  clearInputs();
  toast.classList.add("success");
}



if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}

document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));
