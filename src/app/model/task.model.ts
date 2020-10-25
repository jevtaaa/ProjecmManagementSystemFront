import { User } from './user.model';

export class Task {
    
    

    constructor(private _id: number, private _assignee: string, private _status: string, private _progress: number, private _deadline: Date, private _description: string, private _developer: User) {
    }

    public get developer(): User {
        return this._developer;
    }
    public set developer(value: User) {
        this._developer = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get deadline(): Date {
        return this._deadline;
    }
    public set deadline(value: Date) {
        this._deadline = value;
    }
    public get progress(): number {
        return this._progress;
    }
    public set progress(value: number) {
        this._progress = value;
    }
    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        if (value === 'new' || value === 'in progress' || value ==='finished')
            this._status = value;
    }
    public get assignee(): string {
        return this._assignee;
    }
    public set assignee(value: string) {
        this._assignee = value;
    }



    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    proba() {
        return "proba"
    }
}