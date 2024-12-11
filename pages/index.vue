<script setup>
import { reactive, computed } from "vue";
import draggable from "vuedraggable";
import { useTaskStore } from "../stores/tasks.js";
import { Status } from "../utils/Task.js";

const taskStore = useTaskStore();
const tasks = reactive(taskStore.tasks);
const dialog = ref(true)
const editTask = ref(null)

const todoTasks = computed(() => tasks.filter(task => task.status === Status.TODO));
const inProgressTasks = computed(() => tasks.filter(task => task.status === Status.IN_PROGRESS));
const doneTasks = computed(() => tasks.filter(task => task.status === Status.DONE));

const updateTaskStatusAndOrder = (event, newStatus, taskList) => {
  const { added, moved } = event;

  if (added) {
    const task = added.element;
    const newIndex = added.newIndex;

    task.status = newStatus;

    const oldIndex = tasks.findIndex(t => t === task);
    tasks.splice(oldIndex, 1);
    tasks.splice(newIndex, 0, task);
  }

  if (moved) {
    const { newIndex, oldIndex } = moved;
    const task = taskList[oldIndex];

    const globalOldIndex = tasks.findIndex(t => t === task);
    tasks.splice(globalOldIndex, 1);
    const globalNewIndex = tasks.findIndex(t => taskList[newIndex]);
    tasks.splice(globalNewIndex, 0, task);
  }

  saveToLocalStorage();
};

const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

</script>

<template>
  dsfd{{editTask}}
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <div class="d-flex align-start">
          <v-card class="pa-5 mr-3" rounded="xl" min-width="250" style="background: #101204">
            <span class="text-white d-block mb-3">TODO</span>
            <draggable
              :list="todoTasks"
              group="tasks"
              item-key="id"
              @change="event => updateTaskStatusAndOrder(event, Status.TODO, todoTasks)"
            >
              <template #item="{ element: task }">
                <v-card class="cursor-grab mb-3" style="user-select: none; background: #22272B">
                  <v-card-title class="text-white">
                    {{ task.title }}
                  </v-card-title>
                </v-card>
              </template>
            </draggable>
            <AddTaskModal :status="Status.TODO"></AddTaskModal>
          </v-card>

          <v-card class="pa-5 mr-3" rounded="xl" min-width="250" style="background: #101204">
            <span class="text-white d-block mb-3">In Progress</span>
            <draggable
              :list="inProgressTasks"
              group="tasks"
              item-key="id"
              @change="event => updateTaskStatusAndOrder(event, Status.IN_PROGRESS, inProgressTasks)"
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

          <v-card class="pa-5" rounded="xl" min-width="250" style="background: #101204">
            <span class="text-white d-block mb-3">Done</span>
            <draggable
              :list="doneTasks"
              group="tasks"
              item-key="id"
              @change="event => updateTaskStatusAndOrder(event, Status.DONE, doneTasks)"
            >
              <template #item="{ element: task }">
                <v-card @click="editTask = task" class="cursor-grab mb-3" style="user-select: none; background: #22272B">
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

    <AddTaskModal :task="editTask" v-model="dialog" :status="Status.DONE"></AddTaskModal>
  </v-container>
</template>
