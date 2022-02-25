


export default function cartReducer(cart, action)
{
    switch (action.type) 
    {
        case "empty":
            return[];            
            // eslint-disable-next-line no-unreachable
            break;
        case "update":
            {
                const {quantity, sku } = action;

                return quantity === 0 
                ?cart.filter((i) => i.sku !== sku)
                :cart.map((i) => i.sku === sku ? {...i, quantity} : i);
            }
            // eslint-disable-next-line no-unreachable
            break;
        case "add":
            const {id, sku } = action;
            const itemInCart = cart.find((i) => i.sku === sku);
            if (itemInCart)
            {
                //retorna nuevo arrary si se encuentra ya agregado al carro
                return cart.map((i) => i.sku === sku ? {...i, quantity: i.quantity + 1 } : i);
            }
            else
            {
                //retornar nuevo array con el item que se inserta
                return [...cart, {id, sku, quantity: 1}]
            }
              
            break;
    
        default:
            throw new Error("Unhandled action " + action.type);
            // break;
    }
}