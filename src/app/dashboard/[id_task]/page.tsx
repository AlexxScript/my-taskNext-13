async function loadTask(id_task:string) {
    const res = await fetch(`http://localhost:3000/api/read/${id_task}`)
    return res.json()
}

export default async function Task({ params }: any) {
    const respuesta = await loadTask(params.id_task);
    console.log(respuesta)
    return (
        <div>
            {params.id_task}
        </div>
    );
}
