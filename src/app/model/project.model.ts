import { Task } from './task.model';

export class Project{
    constructor(private _id: number, private _project_name: string, private _project_manager: string, private _tasks: Task[]){}
    public get tasks(): Task[] {
        return this._tasks;
    }
    public set tasks(value: Task[]) {
        this._tasks = value;
    }
    public get project_manager(): string {
        return this._project_manager;
    }
    public set project_manager(value: string) {
        this._project_manager = value;
    }
    public get project_name(): string {
        return this._project_name;
    }
    public set project_name(value: string) {
        this._project_name = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

}