import { Stretch } from "~/models/Stretch"

export const useStretches = (sheet_data : Array<Array<String>> = []) => {
    console.log(sheet_data)
    return useState<Array<Stretch>>('stretches', () => {
        return sheet_data.map(x => new Stretch(x))
    })
}

export const useBodyParts = (stretches = useStretches()) => {
    return computed(() => {
        const bodyParts : Array<String> = []
        stretches.value.forEach(stretch => {
            if ( !bodyParts.includes(stretch.bodyPart) ) {
                bodyParts.push(stretch.bodyPart)
            }
        })
        return bodyParts
    })
}

export const useEnabledStretches = () => {
    let stretches = useState<Array<Stretch>>('stretches')
    return computed(() => {
        return stretches.value.filter(x => x.enabled)
    })
}