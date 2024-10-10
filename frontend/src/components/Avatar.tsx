export const Avatar = ({author,size} : {author : string,size : number})=>{
    return (
        <div className="flex justify-center items-center rounded-full bg-gray-700"
             style={{ width: `${size*4}px`, height: `${size*4}px` }}>
            <div className="font-bold  text-white">
                {author[0]}
            </div>
        </div>
    )
}