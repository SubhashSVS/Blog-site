export const Avatar = ({author,size} : {author : string,size : number})=>{
    return (
        <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-blue-500`}>
            <span className="font-bold text-white dark:text-white">{author[0]}</span>
        </div>
    )
}