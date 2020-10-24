export class User {
    constructor(private id: number, private username: string, private name: string, 
        private surname: string, private email: string, private role: string) {}

    getId() {
        return this.id;
    }        
    getUsername() {
        return this.username;
    }
    getName() {
        return this.name;
    }
    getSurname() {
        return this.surname;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return this.role;
    }

    setId(id: number) {
        this.id = id;
    }        
    setUsername(username: string) {
        this.username = username;
    }
    setName(name: string) {
        this.name = name;
    }
    setSurname(surname: string) {
        this.surname = surname;
    }
    setEmail(email: string) {
        this.email = email;
    }
    setRole(role: string) {
        this.role = role;
    }  
}