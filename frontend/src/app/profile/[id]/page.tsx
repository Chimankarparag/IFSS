export default function userProfile ({params}: any) {
    return(
        <div className="flex">
            <h1>Profile {params.id}</h1>
        </div>
        
    
    )
}