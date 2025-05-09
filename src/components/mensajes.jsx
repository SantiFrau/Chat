import { formatearFechaChat } from "../utils/fecha"

export default function Mensajes({mensajes}){

    return (
        <div className="w-full h-8/10 overflow-y-auto">
            {mensajes.map((msg, index) => {
                const fecha = formatearFechaChat(msg.date)
             return( <div key={index} className={` flex flex-row ${msg.mine ? "justify-end" : "justify-start"}`}>
                <div className={`bg-blue-400 p-2  ${msg.mine ? "rounded-l-lg" : "rounded-r-lg"} relative flex flex-row w-max my-1 `}>
                <p className="font-serif text-black">
                  {msg.description}
                </p>
                 <p className="pl-2 text-xs flex items-end text-blue-950">
                 {fecha}
                 </p>
                </div>
    
                
              </div>)}
            )}
          </div>
    )
}