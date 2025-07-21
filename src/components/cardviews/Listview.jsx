import { Image, Button, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '@/redux/cart/cartSlice';

const Listview = () => {
    const { items } = useSelector((state) => state.cartInfo)
    // console.log(items)
    const dispatch = useDispatch()
    return (

        <Table borderless responsive>
            <tbody>
                {items.map(item => (
                    <tr key={item._id} className="align-middle py-4 border-bottom">
                        <td style={{ width: '100px' }}>
                            <Image src={import.meta.env.VITE_API_URL_IMG + item.coverImage} alt={item.title} fluid thumbnail />
                        </td>
                        <td>
                            <h5 className="mb-1">{item.title}</h5>
                            <div className="text-muted mb-1">by {item.author}</div>
                            <div className="text-muted mb-1">Category: {item.category}</div>
                            <div className="text-success mb-2">{item.status}</div>

                            <div className="d-flex align-items-center mb-2">
                                <Button
                                    variant="light"
                                    size="sm"
                                    onClick={() => dispatch(removeFromCart(item._id))}
                                >
                                    <FaTrash />
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="mx-2"
                                    onClick={() => dispatch(decreaseQuantity(item._id))}

                                >
                                    <AiOutlineMinus />
                                </Button>
                                <span>{item.quantity}</span>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="mx-2"
                                    onClick={() => dispatch(increaseQuantity(item._id))}
                                >
                                    <AiOutlinePlus />
                                </Button>

                            </div>
                        </td>


                    </tr>

                ))}
            </tbody>
        </Table>

    )
}

export default Listview