<script setup>
import {ref} from 'vue';
import draggable from 'vuedraggable';
import {useTaskStore} from "../stores/tasks.js";

const tasks = reactive(useTaskStore().tasks);
const movedItem = ref()

const list1 = computed({
    get() {
      return tasks.filter(task => task.status === Status.IN_PROGRESS)
    },
    set(value) {

    }
  }
);

const list2 = ref([
  {title: "Juan", id: 5},
  {title: "Edgard", id: 6},
  {title: "Johnson", id: 7}
]);


const onAdd= (event) => {
  console.log(event);
};

</script>

<template>
  <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable
        :list="list1"
        group="people"
        itemKey="name"
        @add="onAdd"
      >
        <template #item="{ element, index }">
          <div class="list-group-item">{{ element.title }} {{ index }}</div>
        </template>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable
        :list="list2"
        group="people"
        itemKey="name"
        @add="onAdd"
      >
        <template #item="{ element, index }">
          <div class="list-group-item">{{ element.title }} {{ index }}</div>
        </template>
      </draggable>
    </div>
  </div>
</template>

