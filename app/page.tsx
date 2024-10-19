import { DeployProcess } from "./components/deploy.process";

export default function Home() {
    return (
        <div className="w-full min-h-[100svh] flex items-center justify-center">
            <div className="h[200px]">
                <DeployProcess />
            </div>
        </div>
    );
}
