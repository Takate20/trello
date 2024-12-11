<script setup>
import {ref} from "vue";
import {useTaskStore} from "../stores/tasks.js";
import {Status, ModalAction, Task} from "../utils/Task.js";

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
  }
});

const modalAction = computed(() => {
  if (props.task) {
    return ModalAction.Edit
  } else {
    return ModalAction.Add
  }
})

const dialog = defineModel(false)

const taskData = ref({
  title: "",
  desc: "",
  creator: "",
  workers: "",
  status: props.status,
  priority: 1,
});


watchEffect(() => {
  if(props.task) {
    dialog.value = true
  }
})

const addTask = async () => {
  const taskStore = useTaskStore();
  taskStore.addTask(new Task({...taskData.value}));
  resetForm();
  dialog.value = false;
};

const resetForm = () => {
  taskData.value = {
    title: "",
    desc: "",
    creator: "",
    workers: "",
    status: props.status,
    priority: 1,
  };
};
</script>

<template>
  <div>
    <v-btn @click="dialog = true">
      Add
    </v-btn>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          Add New Task
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="taskData.title" label="Заголовок" variant="outlined" dense></v-text-field>
          <v-textarea v-model="taskData.desc" label="Опис" variant="outlined" dense></v-textarea>
          <v-text-field v-model="taskData.creator" label="Автор" variant="outlined" dense></v-text-field>
          <v-text-field v-model="taskData.workers" label="Виконавці" variant="outlined" dense></v-text-field>
          <v-select v-model="taskData.status" :items="[Status.TODO, Status.IN_PROGRESS, Status.DONE]" label="Статус" variant="outlined" dense></v-select>
          <v-text-field v-model="taskData.priority" label="Пріоритет" type="number" variant="outlined" dense></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="dialog = false">Скасувати</v-btn>
          <v-btn color="primary" @click="addTask">{{ modalAction === ModalAction.Add ? Додати : Редагувати }} </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

