export class Takmicar{

    public name: string;
    public surname: string;
    public age: number;

    constructor(name: string, surname: string, age: number){
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
    getName(): string {
        return this.name;
    }
    getSurname(): string {
        return this.surname;
    }
    getAge(): number {
        return this.age;
    }
}