export type iUser = {
    email:string,
    password:string,
    role:"",
    paid: boolean
}

export type iExperiment = {
    name: string
    creationDate: Date
    researcherID: string
    cam: any
    config: any
    status: "active" | "inactive"
    link:string
    daughters: iDaughter[]
}

export type iDaughter = {
    participantID: string
    jwt: string
    creationDate: Date
    cam: any
}