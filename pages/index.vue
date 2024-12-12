<script setup>
import {ref} from "vue";
import draggable from "vuedraggable";
import {useTaskStore} from "../stores/tasks.js";
import {Status} from "../utils/Task.js";
import {usePeopleStore} from "../stores/people.js";

const tasks = useTaskStore().tasks;
const dialog = ref(false);
const editTask = ref(null);

const isDragging = ref(false);

const todoTasks = ref([]);
const inProgressTasks = ref([]);
const doneTasks = ref([]);

const peopleStore = usePeopleStore();

watchEffect(() => {
  todoTasks.value = tasks.filter(task => task.status === Status.TODO);
  inProgressTasks.value = tasks.filter(task => task.status === Status.IN_PROGRESS);
  doneTasks.value = tasks.filter(task => task.status === Status.DONE);
})

const updateTaskStatusAndOrder = (event, newStatus, taskList) => {
  const {added, moved} = event;

  if(added) {
    const task = added.element;
    const newIndex = added.newIndex;

    task.status = newStatus;

    const oldIndex = tasks.findIndex(t => t === task);
    tasks.splice(oldIndex, 1);
    tasks.splice(newIndex, 0, task);

    saveToLocalStorage();
  }
  if (moved) {
    saveToLocalStorage();
  }
};

watchEffect(() => {
  if (editTask.value) {
    dialog.value = true;
  }
});

watchEffect(() => {
  if (!dialog.value) {
    editTask.value = null
  }
})

const saveToLocalStorage = () => {
  const localTasks = {
    tasks: [...todoTasks.value, ...inProgressTasks.value, ...doneTasks.value]
  }
  localStorage.setItem("taskStore", JSON.stringify(localTasks));
};

</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <div class="d-flex align-start flex-column flex-md-row mx-auto align-center align-md-start ga-4">
          <v-card class="pa-5" rounded="xl" :width="250" style="background: #101204">
            <span class="text-white d-block mb-3">TODO</span>
            <draggable v-model="todoTasks" group="tasks" item-key="id" @change="event => updateTaskStatusAndOrder(event, Status.TODO, todoTasks)" @start="isDragging = true" @end="isDragging = false">
              <template #item="{ element: task }">
                <v-card @click="editTask = task" class="mb-3" :class="{ 'cursor-grab': isDragging }" style="user-select: none; background: #22272B">
                  <v-card-title class="text-white">
                    {{ task.title }}
                  </v-card-title>
                  <v-card-actions v-if="task.workers.length > 0" class="d-flex justify-end">
                    <v-avatar v-for="workerId in task.workers">
                      <v-img :src="peopleStore.getPersonById(workerId)?.avatar"></v-img>
                    </v-avatar>
                  </v-card-actions>
                </v-card>
              </template>
            </draggable>
            <AddTaskModal :status="Status.TODO"></AddTaskModal>
          </v-card>

          <v-card class="pa-5" rounded="xl" width="250" style="background: #101204">
            <span class="text-white d-block mb-3">In Progress</span>
            <draggable v-model="inProgressTasks" group="tasks" item-key="id" @change="event => updateTaskStatusAndOrder(event, Status.IN_PROGRESS, inProgressTasks)" @start="isDragging = true" @end="isDragging = false">
              <template #item="{ element: task }">
                <v-card @click="editTask = task" class="mb-3" :class="{ 'cursor-grab': isDragging }" style="user-select: none; background: #22272B">
                  <v-card-title class="text-white">
                    {{ task.title }}
                  </v-card-title>
                  <v-card-actions v-if="task.workers.length > 0" class="d-flex justify-end">
                    <v-avatar v-for="workerId in task.workers">
                      <v-img :src="peopleStore.getPersonById(workerId)?.avatar"></v-img>
                    </v-avatar>
                  </v-card-actions>
                </v-card>
              </template>
            </draggable>
            <AddTaskModal :status="Status.IN_PROGRESS"></AddTaskModal>
          </v-card>

          <v-card class="pa-5" rounded="xl" min-width="250" style="background: #101204">
            <span class="text-white d-block mb-3">Done</span>
            <draggable v-model="doneTasks" group="tasks" item-key="id" @change="event => updateTaskStatusAndOrder(event, Status.DONE, doneTasks)" @start="isDragging = true" @end="isDragging = false">
              <template #item="{ element: task }">
                <v-card @click="editTask = task" class="mb-3" :class="{ 'cursor-grab': isDragging }" style="user-select: none; background: #22272B">
                  <v-card-title class="text-white">
                    {{ task.title }}
                  </v-card-title>
                  <v-card-actions v-if="task.workers.length > 0" class="d-flex justify-end">
                    <v-avatar v-for="workerId in task.workers">
                      <v-img :src="peopleStore.getPersonById(workerId)?.avatar"></v-img>
                    </v-avatar>
                  </v-card-actions>
                </v-card>
              </template>
            </draggable>
            <AddTaskModal :status="Status.DONE"></AddTaskModal>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <template v-if="editTask">
      <AddTaskModal :task="editTask" :modal-action="ModalAction.Edit" v-model="dialog" :status="Status.TODO"></AddTaskModal>
    </template>

  </v-container>
</template>
