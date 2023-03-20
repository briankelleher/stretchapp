export class Stretch {
    name: string
    timer: number
    enabled: Boolean
    bodyPart: string
    routine: string
    description: string
    
    constructor(row : Array<string>) {
        this.name = row[0]
        this.timer = parseInt(row[1])
        this.enabled = row[2] === "x"
        this.bodyPart = row[3]
        this.routine = row[4]
        this.description = row[5]
    }
}