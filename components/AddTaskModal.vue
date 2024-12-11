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
    },
    modalAction: {
      type: String,
      default: ModalAction.Add
    }
  });

  const dialog = defineModel(false)
  const editTask = ref(props.task)

  const taskData = computed(() => {
      return {
        title: editTask.value ? editTask.value.title : '',
        desc: editTask.value ? editTask.value.desc: '',
        creator: editTask.value ? editTask.value.creator: '',
        workers: editTask.value ? editTask.value.workers: '',
        status: editTask.value ? editTask.value.status: props.status,
        priority: 1,
      }
    }
  );

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
    <v-btn v-if="props.modalAction === ModalAction.Add" @click="dialog = true">
      Add {{modalAction}}
    </v-btn>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          {{ props.modalAction === ModalAction.Add ? 'Add New Task' : 'Edit Task' }}
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
          <v-btn color="primary" @click="addTask">{{ props.modalAction === ModalAction.Add ? 'Додати' : 'Редагувати' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

