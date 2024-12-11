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

const updateTaskStatus = (task, newStatus) => {
  const index = tasks.findIndex(t => t === task);
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
        <div class="d-flex">

          <v-card class="bg-red pa-5">
            <span>TODO</span>
            <draggable
              v-model="todoTasks"
              group="tasks"
              @change="({ added }) => added && updateTaskStatus(added.element, Status.TODO)"
            >
              <template #item="{ element: task }">
                <v-card class="cursor-grab" style="user-select: none">
                  <v-card-title>
                    {{ task.title }}
                  </v-card-title>
                </v-card>
              </template>
            </draggable>
          </v-card>

          <v-card class="bg-red pa-5">
            <span class="text-uppercase">In Progress</span>
            <draggable
              v-model="inProgressTasks"
              group="tasks"
              @change="({ added }) => added && updateTaskStatus(added.element, Status.IN_PROGRESS)"
            >
              <template #item="{ element: task }">
                <v-card class="cursor-grab" style="user-select: none">
                  <v-card-title>
                    {{ task.title }}
                  </v-card-title>
                </v-card>
              </template>
            </draggable>
          </v-card>

          <v-card class="bg-red pa-5">
            <span class="text-uppercase">Done</span>
            <draggable
              v-model="doneTasks"
              group="tasks"
              @change="({ added }) => added && updateTaskStatus(added.element, Status.DONE)"
            >
              <template #item="{ element: task }">
                <v-card class="cursor-grab" style="user-select: none">
                  <v-card-title>
                    {{ task.title }}
                  </v-card-title>
                </v-card>
              </template>
            </draggable>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
