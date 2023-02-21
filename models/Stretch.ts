export class Stretch {
    name: String
    timer: String
    enabled: Boolean
    bodyPart: String
    routine: String
    description: String
    
    constructor(row : Array<String>) {
        this.name = row[0]
        this.timer = row[1]
        this.enabled = row[2] === "x"
        this.bodyPart = row[3]
        this.routine = row[4]
        this.description = row[5]
    }
}