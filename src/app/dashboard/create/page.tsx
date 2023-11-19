import FormCreate from "@/components/FormCreate"

const createPage = () => {
    return ( 
        <div className=" flex flex-col justify-center max-w-xl h-96 mt-9 mx-auto border-solid border-2
            rounded-lg border-stone-300
        ">
            <FormCreate/>
        </div>            
    );
};

export default createPage