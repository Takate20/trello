<script setup>
  import {useTaskStore} from "../stores/tasks.js";

  const dialog = ref(false)
  const props = defineProps({
    status: String
  })

  const addTask = async () => {
    useTaskStore().addTask(new Task(
      {
        title: "title",
        desc: "desc",
        creator: "creator",
        workers: "workers",
        status: Status.TODO,
        priority: 1
      }
    ));
  }
</script>

<template>
  <div class="text-center pa-4">
    <v-btn @click="dialog = true">
      Open Dialog
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        text="Your application will relaunch automatically after the update is complete."
        title="Update in progress"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="dialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

</style>