import { Stretch } from "~/models/Stretch"

export function useStretches() {
    const stretches = useState<Array<Stretch>>('stretches', () => [])
    return {
        stretches
    }
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