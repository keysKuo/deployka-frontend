import { API_URL } from "@/constants"

export const enum FrameWork {
    CRA = 'Create React App',
    NEXTJS = 'NextJS',
    NUXTJS = 'NuxtJS',
    VITE = 'Vite',
    ANGULAR = 'Angular'
}

export type Environment = {
    key: string,
    value: string
}

export type BuildForm = {
    uploadId: string,
    projectName: string
    framework: FrameWork,
    rebuild: boolean,
    subdomain?: string,
    rootDir?: string,
    outDir?: string,
    buildCommand?: string,
    installCommand?: string
    environments?: Environment[]
}

export type BuildReponse = {

}

export const buildProject = async (form: BuildForm) => {
    const buildResponse = await fetch(API_URL + "/deploy/build", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
        cache: 'no-store'
    })
    .then(response => response.json())
    .then(result => result.metadata)
    .catch(err => console.log(err))

    return buildResponse;
}
