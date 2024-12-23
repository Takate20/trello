export const Status = Object.freeze({
    TODO: 'TODO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE',
});

export class Task {
    constructor({id, title, desc, creator, workers, status = Status.TODO, priority = 0}) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.creator = creator;
        this.workers = workers;
        this.status = status;
        this.priority = priority;
    }
}

export const ModalAction = Object.freeze({
    Add: 'Add',
    Edit: 'Edit',
});