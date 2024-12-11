import {defineStore} from 'pinia';

const srcs = {
    1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
};

const peopleData = [
    {id: 1, name: 'Sandra Adams', avatar: srcs[1]},
    {id: 2, name: 'Ali Connors', avatar: srcs[2]},
    {id: 3, name: 'Trevor Hansen', avatar: srcs[3]},
    {id: 4, name: 'Tucker Smith', avatar: srcs[2]},
    {id: 5, name: 'Britta Holt', avatar: srcs[4]},
    {id: 6, name: 'Jane Smith ', avatar: srcs[5]},
    {id: 7, name: 'John Smith', avatar: srcs[1]},
    {id: 8, name: 'Sandra Williams', avatar: srcs[3]},
];

export const usePeopleStore = defineStore('peopleStore', () => {
    const people = ref(peopleData);

    const getPeople = () => people.value;

    const getPersonById = (id) => people.value.find(person => person.id === id);

    return {
        people,
        getPeople,
        getPersonById,
    };
});