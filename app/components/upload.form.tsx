'use client';

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RepositoryData, UploadForm, uploadRepository } from "@/services/upload.repo";
import { ReloadIcon } from "@radix-ui/react-icons";

type UploadRepoFormProps = {
    handleChangeId: (id: string) => void,
    handleChangeRepoData: (data: RepositoryData) => void
}


export function UploadRepoForm({ handleChangeId, handleChangeRepoData }: UploadRepoFormProps) {
    const [uploadForm, setUploadForm] = React.useState<UploadForm>({ repoUrl: "" });
    const [loading, setLoading] = React.useState(false);
    const [uploadStatus, setUploadStatus] = React.useState("Checking repository...");

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploadForm({ ...uploadForm, [e.target.name]: e.target.value });
    }

    const onUpload = async () => {
        setLoading(true);
        const uploadData = await uploadRepository(uploadForm);
        if (uploadData) {
            setUploadStatus("Preparing project...");
            setTimeout(() => {
                handleChangeId(uploadData.uploadId);
                handleChangeRepoData(uploadData.repoData);
                setLoading(false);
            }, 2000);
        }
        else {
            setLoading(false);
        }
    }

    return (
        <>
            {
                loading
                    ? <div className="flex items-center">
                        <ReloadIcon className="h-4 w-10 animate-spin" /> {uploadStatus}
                    </div>
                    : <Card className="w-[650px] border-[#71b190] border-[0.15rem] shadow-md drop-shadow-md">
                        <CardHeader>
                            <CardTitle className="text-[1.8rem]">Import a Git Repository</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="repoUrl">Git Repository URL</Label>
                                        <Input onChange={onChangeInput} id="repoUrl" name="repoUrl" placeholder="https://git-provider.com/scope/repo" />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button type="button" onClick={onUpload} className="hover:bg-[#71b190]">Import</Button>
                        </CardFooter>
                    </Card>
            }
        </>
    )
}
