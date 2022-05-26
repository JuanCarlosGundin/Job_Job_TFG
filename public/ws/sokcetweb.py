import asyncio
import websockets

USERS={}
pixel=[]

async def echo(websocket,path):
    global USERS

    if not USERS.get(str(path)):
        
        USERS[str(path)]=set()

    try:
        
        USERS[str(path)].add(websocket)
        websocket.send(pixel)
        
        #websockets.broadcast(USERS,('User Add') )
        async for message in websocket:
            pixel.append(message)
            websockets.broadcast(USERS[str(path)],(message)) 
    except:
        
        # Eliminar USUARIO desconectado
        USERS[str(path)].remove(websocket)
        if len(USERS.get(str(path))) == 0:
            del USERS[str(path)]
        
        #websockets.broadcast(USERS,('User Disconect') )
 
async def main():
    
    async with websockets.serve(echo, "0.0.0.0", 8000):
        await asyncio.Future()  # run forever

asyncio.run(main())