import {Status} from "/utils/Task.js";

export const useTaskStore = defineStore(
    'taskStore',
    () => {
        const tasks = ref([]);

        const addTask = (task) => {
            const taskToPlainObject = (task) => ({
                id: tasks.value.length,
                title: task.title,
                desc: task.desc,
                creator: task.creator,
                workers: task.workers,
                status: task.status,
                priority: task.priority,
            });

            tasks.value.push(taskToPlainObject(task));
        };

        const deleteTask = (id) => {
            const index = tasks.value.findIndex(task => task.id === id);
            tasks.value.splice(index, 1);
        };

        const updateTaskStatus = (index, newStatus) => {
            if (Object.values(Status).includes(newStatus)) {
                tasks.value[index].status = newStatus;
            } else {
                console.error('Invalid status:', newStatus);
            }
        };

        const editTask = (updatedTask) => {
            const index = tasks.value.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                tasks.value[index] = { ...updatedTask };
            }
        };

        const getTasks = () => tasks.value;

        return {
            tasks,
            addTask,
            deleteTask,
            editTask,
            updateTaskStatus,
            getTasks,
            Status,
        };
    },
    {
        persist: {
            storage: localStorage,
        }
    }
)
