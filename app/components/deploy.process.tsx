'use client';

import { BuildProjectForm } from "@/app/components/build.form";
import { UploadRepoForm } from "@/app/components/upload.form";
import { RepositoryData } from "@/services/upload.repo";
import * as React from "react"

export function DeployProcess() {
    const [uploadId, setUploadId] = React.useState("");
    const [repoData, setRepoData] = React.useState<RepositoryData | null>(null);

    const handleChangeId = React.useCallback((newId: string) => {
        setUploadId(newId);
    }, []);

    const handleChangeRepoData = React.useCallback((newRepoData: RepositoryData) => {
        setRepoData(newRepoData);
    }, [])

    React.useEffect(() => { }, [handleChangeId, handleChangeRepoData]);

    return <React.Fragment>
        {uploadId && repoData
            ? <BuildProjectForm uploadId={uploadId} repoData={repoData} />
            : <UploadRepoForm handleChangeId={handleChangeId} handleChangeRepoData={handleChangeRepoData} />}
    </React.Fragment>
}
