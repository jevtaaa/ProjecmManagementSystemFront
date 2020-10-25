import { Task } from './task.model';
import { User } from './user.model';

export class Project{
    constructor(private _id: number, private _name: string, private _projectManager: User, private _tasks: Task[]){}
    public get tasks(): Task[] {
        return this._tasks;
    }
    public set tasks(value: Task[]) {
        this._tasks = value;
    }
    public get projectManager(): User {
        return this._projectManager;
    }
    public set projectManager(value: User) {
        this._projectManager = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

}