<script setup>
import {ref} from "vue";
import {useTaskStore} from "../stores/tasks.js";
import {Status, ModalAction, Task} from "../utils/Task.js";
import {usePeopleStore} from "../stores/people.js";

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator(value) {
      return Object.values(Status).includes(value);
    }
  },
  task: {
    type: Object,
    default: null
  },
  modalAction: {
    type: String,
    default: ModalAction.Add
  }
});

const { people } = usePeopleStore()
const dialog = defineModel(false)
const editedTask = props.task

const taskData = ref({
  id: editedTask?.id ?? -1,
  title: editedTask?.title ?? '',
  desc: editedTask?.desc ?? '',
  creator: editedTask?.creator ?? '',
  workers: editedTask?.workers ?? [],
  status: editedTask?.status ?? props.status,
  priority: 1,
});

const addTask = async () => {
  const taskStore = useTaskStore();
  taskStore.addTask(new Task({...taskData.value}));
  resetForm();
  dialog.value = false;
};

const editTask = async () => {
  const taskStore = useTaskStore();
  taskStore.editTask(taskData.value)
  resetForm();
  dialog.value = false;
}

const deleteTask = async () => {
  const taskStore = useTaskStore();
  taskStore.deleteTask(taskData.value.id)
  resetForm();
  dialog.value = false;
}

const resetForm = () => {
  taskData.value = {
    title: "",
    desc: "",
    creator: "",
    workers: [],
    status: props.status,
    priority: 1,
  };
};

</script>

<template>
  <div>
    <v-btn v-if="props.modalAction === ModalAction.Add" @click="dialog = true">
      Add
    </v-btn>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          {{ props.modalAction === ModalAction.Add ? 'Add New Task' : 'Edit Task' }}
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="taskData.title" label="Title" variant="outlined" dense></v-text-field>
          <v-textarea v-model="taskData.desc" label="Desc" variant="outlined" dense></v-textarea>
          <v-autocomplete
            variant="outlined"
            v-model="taskData.creator"
            :items="people"
            color="blue-grey-lighten-2"
            item-title="name"
            item-value="id"
            label="Creator"
            chips
            closable-chips
          >
            <template v-slot:chip="{ props, item }">
              <v-chip
                v-bind="props"
                :prepend-avatar="item.raw.avatar"
                :text="item.raw.name"
              ></v-chip>
            </template>

            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :prepend-avatar="item.raw.avatar"
                :subtitle="item.raw.group"
                :title="item.raw.name"
              ></v-list-item>
            </template>
          </v-autocomplete>
          <v-autocomplete
            variant="outlined"
            v-model="taskData.workers"
            :items="people"
            color="blue-grey-lighten-2"
            item-title="name"
            item-value="id"
            label="Executors"
            chips
            closable-chips
            multiple
          >
            <template v-slot:chip="{ props, item }">
              <v-chip
                v-bind="props"
                :prepend-avatar="item.raw.avatar"
                :text="item.raw.name"
              ></v-chip>
            </template>

            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :prepend-avatar="item.raw.avatar"
                :subtitle="item.raw.group"
                :title="item.raw.name"
              ></v-list-item>
            </template>
          </v-autocomplete>
          <v-select v-model="taskData.status" :items="[Status.TODO, Status.IN_PROGRESS, Status.DONE]" label="Status" variant="outlined" dense></v-select>
          <v-text-field v-model="taskData.priority" label="Priority" type="number" variant="outlined" dense></v-text-field>
        </v-card-text>

        <v-card-actions class="d-flex justify-space-between">
          <div>
            <v-btn v-if="props.modalAction === ModalAction.Edit" @click="deleteTask" icon="mdi-delete"></v-btn>
          </div>
          <div>
            <v-btn @click="dialog = false">Cancel</v-btn>
            <template v-if="props.modalAction === ModalAction.Add">
              <v-btn :disabled="taskData.title === ''" color="primary" @click="addTask">Add</v-btn>
            </template>
            <template v-else>
              <v-btn color="primary" @click="editTask">Edit</v-btn>
            </template>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

