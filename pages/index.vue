<script setup>
import { reactive, computed } from "vue";
import draggable from "vuedraggable";
import { useTaskStore } from "../stores/tasks.js";
import { Status } from "../utils/Task.js";

const taskStore = useTaskStore();
const tasks = reactive(taskStore.tasks);

const todoTasks = computed(() => tasks.filter(task => task.status === Status.TODO));
const inProgressTasks = computed(() => tasks.filter(task => task.status === Status.IN_PROGRESS));
const doneTasks = computed(() => tasks.filter(task => task.status === Status.DONE));

// const updateTaskStatusAndOrder = (event, newStatus, taskList) => {
//   const { added, moved } = event;
//
//   // Якщо елемент додано в новий список
//   if (added) {
//     const task = added.element;
//     const newIndex = added.newIndex;
//
//     // Змінюємо статус таска
//     task.status = newStatus;
//
//     // Оновлюємо основний масив tasks
//     const oldIndex = tasks.findIndex(t => t === task);
//     tasks.splice(oldIndex, 1); // Видаляємо з попередньої позиції
//     tasks.splice(newIndex, 0, task); // Додаємо на нову позицію
//   }
//
//   // Якщо елемент переміщено в межах списку
//   if (moved) {
//     const { newIndex, oldIndex } = moved;
//     const task = taskList[oldIndex];
//
//     // Переміщуємо елемент в tasks
//     const globalOldIndex = tasks.findIndex(t => t === task);
//     tasks.splice(globalOldIndex, 1); // Видаляємо зі старої позиції
//     const globalNewIndex = tasks.findIndex(t => taskList[newIndex]);
//     tasks.splice(globalNewIndex, 0, task); // Додаємо на нову позицію
//   }
//
//   saveToLocalStorage();
// };
//


const updateTaskStatus = (task, newStatus) => {
  const index = tasks.findIndex(t => t === task);

  console.log(`index: ${index}`)
  if (index !== -1) {
    taskStore.updateTaskStatus(index, newStatus);
    saveToLocalStorage();
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadFromLocalStorage = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    tasks.splice(0, tasks.length, ...savedTasks);
  }
};

loadFromLocalStorage();
</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <div class="d-flex align-start">
          <v-card class="pa-5 mr-3" rounded="xl" min-width="250" style="background: #101204">
            <span class="text-white d-block mb-3">TODO</span>
            <draggable
              :list="todoTasks"
              group="tasks"
              :move="(event) => {console.log(event)}"
              item-key="id"
              @change="({ added }) => added && updateTaskStatus(added.element, Status.TODO)"
            >
              <template #item="{ element: task }">
                <v-card min-width="200" class="cursor-grab mb-3" style="user-select: none; background: #22272B">
                  <v-card-title class="text-white">
                    {{ task.title }}
                  </v-card-title>
                </v-card>
              </template>
            </draggable>
            <AddTaskModal :status="Status.TODO"></AddTaskModal>
          </v-card>

          <v-card class="pa-5 mr-3" min-width="250" rounded="xl" style="background: #101204">
            <span class="text-white d-block mb-3">In Progress</span>
            <draggable
              :list="inProgressTasks"
              group="tasks"
              item-key="id"
              @change="({ added }) => added && updateTaskStatus(added.element, Status.IN_PROGRESS)"
            >
              <template #item="{ element: task }">
                <v-card class="cursor-grab mb-3"  style="user-select: none; background: #22272B">
                  <v-card-title class="text-white">
                    {{ task.title }}
                  </v-card-title>
                </v-card>
              </template>
            </draggable>
            <AddTaskModal :status="Status.IN_PROGRESS"></AddTaskModal>
          </v-card>

          <v-card class="pa-5" min-width="250"  rounded="xl" style="background: #101204">
            <span class="text-white d-block mb-3">Done</span>
            <draggable
              :list="doneTasks"
              group="tasks"
              item-key="id"
              @change="({ added }) => added && updateTaskStatus(added.element, Status.DONE)"
            >
<!--              <template #header></template>-->
<!--              <template #footer></template>-->
              <template #item="{ element: task }">
                <v-card class="cursor-grab mb-3" style="user-select: none; background: #22272B">
                  <v-card-title class="text-white">
                    {{ task.title }}
                  </v-card-title>
                </v-card>
              </template>
            </draggable>
            <AddTaskModal :status="Status.DONE"></AddTaskModal>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
