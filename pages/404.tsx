import { useRouter } from "next/router";

function ErrorPage() {
    
    const Router = useRouter();

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center  border-b-2 border-secondary select-none mx-4 sm:mx-6">
            <div className="grid grid-rows-2 items-center gap-4">
                    <div className="inline-flex items-center justify-center gap-2">
                    <p className="text-primaryHeading font-semibold text-4xl block tracking-widest">404</p>
                    <p className="text-primaryHeading font-semibold text-4xl block -mt-1 tracking-widest">|</p>
                    <p className="text-primaryParagraph text-2xl block">Not found</p>
                </div>
                <p> Oops.! The page you&apos;re looking for doesn&apos;t exist. <span className="underline decoration-secondary cursor-pointer" onClick={() => Router.replace('/')}>Back to home!</span> </p>
            </div>
        </div>
    );
}

export default ErrorPage;